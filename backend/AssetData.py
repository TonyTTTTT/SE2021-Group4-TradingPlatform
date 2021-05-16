from datetime import datetime
import csv
from dateutil.parser import parse


class AssetData:
    path = '../input-data/TXF.csv'

    # start&end must me 'yyyy-mm-dd'
    def load(self, start=None, end=None):
        f = open(self.path)
        r = csv.reader(f)
        data_all = []
        for data in r:
            if data[0] != '':
                data_all.append(data)
        data_new = []
        for i in range(1, len(data_all)):
            data_all[i][0] = str(parse(data_all[i][0]).date())
            tmp = dict(time = data_all[i][0],
                       contract = data_all[i][1],
                       open = data_all[i][2],
                       high = data_all[i][3],
                       low = data_all[i][4],
                       close = data_all[i][5],
                       volume = data_all[i][6],
                       delta = data_all[i][7])
            if start == None and end == None:
                data_new.append(tmp)
            elif start <= tmp['time'] <= end:
                data_new.append(tmp)
        
        f.close()
        return data_new


a = AssetData()
asset_data = a.load()