import cv2
import numpy as np

# templateSize = 模板ｎ＊ｎ
# bucketSize = 灰階分類個數
# step = 模板移動步長
def oilPainting(input_filename, output_filename, templateSize, bucketSize, step):  
    img = cv2.imread(input_filename)
    row, col = img.shape[:2]
    # 調整速度
    r_img = cv2.resize(img, (int(col/1),int(row/1)))
    row1, col1 = r_img.shape[:2]
    
    # 灰階pixel分類
    img_gray = cv2.cvtColor(r_img, cv2.COLOR_RGB2GRAY)
    img_gray = ((img_gray / 256) * bucketSize).astype(int)   
    
    # 初始 oil painting picture
    img_oil = np.zeros(r_img.shape, np.uint8)
    for i in range(0, row1-step, step):
        print(i)
        # 計算模板邊界
        top = i - templateSize
        bottom = i + templateSize + 1
        # 處理超過img範圍的pixel
        if top < 0:
            top = 0
        if bottom >= row1:
            bottom = row1 - 1

        for j in range(0, col1-step, step):
            left = j - templateSize
            right = j + templateSize + 1
            if left < 0:
                left = 0
            if right >= col1:
                right = col1 - 1

            # 統計灰階桶內個數
            buckets = np.zeros(bucketSize, np.uint8)  
            for x in range(top, bottom):
                for y in range(left, right):
                    buckets[img_gray[x, y]] += 1 
            maxBucketNum = np.max(buckets) 
            maxBucketIndex = np.argmax(buckets)

            # 取桶內平均值
            bucketsMean = [0, 0, 0]
            for x in range(top, bottom):
                for y in range(left, right):
                    if img_gray[x, y] == maxBucketIndex:
                        bucketsMean += r_img[x, y]
            bucketsMean = (bucketsMean / maxBucketNum).astype(int)

            # 將平均值放到step範圍的pixel
            for m in range(step):
                for n in range(step):
                    img_oil[m + i, n + j] = (bucketsMean[0], bucketsMean[1], bucketsMean[2])
    img_oil = cv2.resize(img_oil, (col, row))
    cv2.imwrite(output_filename, img_oil)

#oilPainting('Cherry2.jpg','output.jpg', 3, 8, 1)
