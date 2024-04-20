import cv2
from imwatermark import WatermarkEncoder, WatermarkDecoder
import uuid

uuid = str(uuid.uuid4())
print(uuid)

WatermarkDecoder.loadModel()

bgr = cv2.imread('kush.JPG')
wm = 'kush'

encoder = WatermarkEncoder()
encoder.set_watermark('uuid', uuid)
bgr_encoded = encoder.encode(bgr, 'dwtDctSvd')

cv2.imwrite('kush_wm.JPG', bgr_encoded)


bgr = cv2.imread('kush_wm.JPG')

decoder = WatermarkDecoder('uuid', 128)
watermark = decoder.decode(bgr, 'dwtDctSvd')
print(watermark)
