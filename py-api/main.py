from fastapi import FastAPI, File, UploadFile
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
import json

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uri = "mongodb+srv://markeddown:6i0w9fFQqDHrEYsR@markeddown.fdnkd6g.mongodb.net/?retryWrites=true&w=majority&appName=MarkedDown";

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

    exif_dict = piexif.load('test.png')

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
async def decode_file(file: UploadFile = File(...)):
    with open('decoded.png', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

    bgr = cv2.imread('decoded.png')

    decoder = WatermarkDecoder('uuid', 128)
    watermark = decoder.decode(bgr, 'dwtDctSvd')
    print(watermark)


    return {"watermark": watermark}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)