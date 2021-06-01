import cv2
import numpy as np
from PIL import Image


def waterColor(input_filename, output_filename):
    # Parameters
    average_square = (5, 5)
    sigma_x = 0
    k=20
    line_average = (9, 9)
    line_sigma_x = 0
    multi_w = 0.4
    paint_w = 0.9
    gamma = 1.5
    method = 2

    image = cv2.imread(input_filename, 1)

    # GaussianBlur
    image_blurring = cv2.GaussianBlur(image, average_square, sigma_x)
    w , h , channel = image_blurring.shape
    image_reshape = np.zeros((w , h ,3), np.uint8)
    
    # Quantization, GaussianBlur
    image_reshape = image_blurring // k * k
    paint = cv2.GaussianBlur(image_reshape, average_square, sigma_x)

    # Sobel edge detection
    image_preprocessed  = cv2.cvtColor(cv2.GaussianBlur(image, line_average, line_sigma_x), cv2.COLOR_BGR2GRAY)

    # Canny edge detection
    image_binary = cv2.Canny(image_preprocessed, threshold1 = 50, threshold2 = 55) 
    image_binary = cv2.GaussianBlur(image_binary, average_square, sigma_x)
    res, image_binary = cv2.threshold(image_binary, 90, 255, cv2.THRESH_BINARY_INV)

    # Other procedures
    w , h , channel = paint.shape
    image_binary = np.where(image_binary > 0, 255, 0)
    image_binary = np.dstack((image_binary, image_binary, image_binary))
    QQ = np.multiply(paint, image_binary) // 255
    result = np.array(QQ, np.uint8)
    
    d = cv2.addWeighted(result, multi_w, paint, paint_w, gamma)
    
    # Output the frame
    cv2.imwrite(output_filename, d)

