import cv2
import numpy as np

def sketchPainting(input_filename, output_filename):
    img_rgb = cv2.imread(input_filename)
    img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
    # 反向模糊
    img_inv = 255 - img_gray
    img_blur = cv2.GaussianBlur(img_inv, (25, 25), 0, 0)

    img_sketch = cv2.divide(img_gray, 255 - img_blur, scale=256)
    cv2.imwrite(output_filename, img_sketch)
