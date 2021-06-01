import cv2
import numpy as np

def oldPainting(input_filename, output_filename):
    img = cv2.imread(input_filename)
    row, col = img.shape[:2]
    r_img = cv2.resize(img, (int(col/4),int(row/4)))
    row1, col1 = r_img.shape[:2]
    img_old = np.zeros(r_img.shape, np.uint8)
    for i in range(row1):
        #print(i)
        for j in range(col1):
            B = min( 0.3 * r_img[i,j][2] + 0.5 * r_img[i,j][1] + 0.1 * r_img[i,j][0], 255 )
            G = min( 0.3 * r_img[i,j][2] + 0.7 * r_img[i,j][1] + 0.2 * r_img[i,j][0], 255 )
            R = min( 0.4 * r_img[i,j][2] + 0.8 * r_img[i,j][1] + 0.2 * r_img[i,j][0], 255 )
            img_old[i,j] = np.uint8((B, G, R))
    img_old = cv2.resize(img_old, (col, row))
    cv2.imwrite(output_filename, img_old)

#oldPainting('Cherry2.jpg','old_output.jpg')
