from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from imwatermark import WatermarkEncoder, WatermarkDecoder
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import boto3
from botocore.exceptions import ClientError
import cv2
import shutil
from pathlib import Path
import uuid
import piexif
from PIL import Image
from fastapi.responses import JSONResponse
import json
from uagents import Model
from uagents.query import query

from uagents import Agent, Context, Model
 
class TestRequest(Model):
    message: str
 
class Response(Model):
    text: str
 
agent = Agent(
    name="your_agent_name_here",
    seed="your_agent_seed_here",
    port=8001,
    endpoint="http://localhost:8001/submit",
)
 
@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {agent.name}")
    ctx.logger.info(f"With address: {agent.address}")
    ctx.logger.info(f"And wallet address: {agent.wallet.address()}")
 
@agent.on_query(model=TestRequest, replies={Response})
async def query_handler(ctx: Context, sender: str, _query: TestRequest):
    ctx.logger.info("Query received")
    try:
        # do something here
        await ctx.send(sender, Response(text="success"))
    except Exception:
        await ctx.send(sender, Response(text="fail"))
 

AGENT_ADDRESS = "agent1qfw3kvv2qwd4r6ghxdtru4pyfk5k8mrtdexq73w9mqd4vw7jqqtg698z0x8"
 
class TestRequest(Model):
    message: str
 
async def agent_query(req):
    response = await query(destination=AGENT_ADDRESS, message=req, timeout=15.0)
    data = json.loads(response.decode_payload())
    return data["text"]
 
app = FastAPI()
 

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uri = "mongodb+srv://markeddown:6i0w9fFQqDHrEYsR@markeddown-atlas.vzwdz85.mongodb.net/?retryWrites=true&w=majority&appName=MarkedDown-Atlas";

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    with open('test.png', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

    bgr = cv2.imread('test.png')
    wm = str(uuid.uuid4())

    encoder = WatermarkEncoder()
    encoder.set_watermark('uuid', wm)
    bgr_encoded = encoder.encode(bgr, 'dwtDctSvd')

    mongo_upload = client.markeddown.images.insert_one({
        "uuid": wm,
    })

    cv2.imwrite('test_wm.png', bgr_encoded)

    mongoId = str(mongo_upload.inserted_id)

    s3 = boto3.client('s3', aws_access_key_id='AKIA4QTK6AMEKL2JO62W', aws_secret_access_key='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')
    try:
        s3.upload_file('test_wm.png', 'markeddown', mongoId)
    except ClientError as e:
        print(e)

    response = FileResponse('test_wm.png')
    response.headers["uuid"] = wm
    response.headers["objectID"] = mongoId
    response.headers["Access-Control-Expose-Headers"] = "uuid, objectID"
    print(mongoId)
    return response


@app.post("/decodefile/")
async def decode_file(file: UploadFile = File(...), userId: str = Form(...), url: str = Form(...)):
    file_extension = file.filename.split('.')[-1]
    decoded_file_name = f'decoded.{file_extension}'
    try:
        with open(decoded_file_name, 'wb') as buffer:
            shutil.copyfileobj(file.file, buffer)

        bgr = cv2.imread(decoded_file_name)

        decoder = WatermarkDecoder('uuid', 128)
        watermark = decoder.decode(bgr, 'dwtDctSvd')
        print(watermark)

        if watermark is None:
            return JSONResponse(status_code=400, content={"error": "No watermark found"})
        else:
            match = client.markeddown.images.find_one({"uuid": watermark, "userId": userId})
            if match:
                if url != "self":
                    client.markeddown.images.update_one({"url": url}, {"$set": {"uuid": watermark, "userId": userId, "type": 'scan'}}, upsert=True)
                return JSONResponse(status_code=200, content={"match": "true", "uuid": watermark, "objectID": str(match["_id"])})
            else:
                return JSONResponse(status_code=400, content={"error": "No match found"})
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"error": "An error occurred during the decoding process"})
 
@app.post("/agent/endpoint")
async def make_agent_call(req: TestRequest):
    try:
        res = await agent_query(req)
        return f"successful call - agent response: {res}"
    except Exception:
        return "unsuccessful agent call"

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
    agent.run()

