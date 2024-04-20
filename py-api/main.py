from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from imwatermark import WatermarkEncoder, WatermarkDecoder
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import cv2
import shutil
from pathlib import Path
import uuid
import piexif
from PIL import Image
import json

app = FastAPI()

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

    img = Image.open('test.png')
    exif_dict = piexif.load(img.info['exif'])
    
    if '0th' in exif_dict:
        exif_dict_str_keys = {piexif.ImageIFD.Make: exif_dict['0th'][271],
                              piexif.ImageIFD.Model: exif_dict['0th'][272],
                              piexif.ImageIFD.DateTime: exif_dict['0th'][306]}
    else:
        exif_dict_str_keys = {}

    client.markeddown.images.insert_one({
        "uuid": wm,
        "make": exif_dict_str_keys[piexif.ImageIFD.Make].decode('utf-8'),
        "model": exif_dict_str_keys[piexif.ImageIFD.Model].decode('utf-8'),
        "datetime": exif_dict_str_keys[piexif.ImageIFD.DateTime].decode('utf-8'),
    })

    cv2.imwrite('test_wm.png', bgr_encoded)

    return FileResponse('test_wm.png')


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