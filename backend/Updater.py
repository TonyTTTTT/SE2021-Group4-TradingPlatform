import requests
import csv
from datetime import datetime


class Updater:
    today = str(datetime.today().date()).replace('-', '/')
    url = 'https://www.taifex.com.tw/cht/3/dlFutDataDown'
    # queryStartDate&queryEndDate must be 'yyyy/mm/dd'
    data = {'down_type': '1', 'commodity_id': 'TX',
            'queryStartDate': today, 'queryEndDate': today}
    path = '../input-data/TXF.csv'

    def update(self):
        res = requests.post(self.url, data=self.data)
        content = res.content.decode('big5')
        content_list = content.split('\r\n')
        for i in range(0, len(content_list)):
            content_list[i] = content_list[i].split(',')
            for j in range(0, len(content_list[i])):
                content_list[i][j] = content_list[i][j].strip()
        del content_list[-1]
        for data in content_list:
            if data[2] == '202105' and data[17] == '一般':
                f = open(self.path, 'a')
                writer = csv.writer(f)
                writer.writerow([data[0], data[2], data[3],
                                 data[4], data[5], data[6],
                                 data[9], 0])
                f.close()

        return content_list


u = Updater()
data_updated = u.update()
