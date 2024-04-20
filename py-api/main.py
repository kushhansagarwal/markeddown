from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from imwatermark import WatermarkEncoder, WatermarkDecoder
import cv2
import shutil
from pathlib import Path
import uuid

app = FastAPI()

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    with open('test.png', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

    bgr = cv2.imread('test.png')
    wm = str(uuid.uuid4())

    encoder = WatermarkEncoder()
    encoder.set_watermark('uuid', wm)
    bgr_encoded = encoder.encode(bgr, 'dwtDctSvd')

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