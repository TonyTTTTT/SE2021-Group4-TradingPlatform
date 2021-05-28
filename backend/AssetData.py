import csv
from dateutil.parser import parse
import numpy as np


class AssetDataLoader:
    path = '../input-data/TXF.csv'

    # start&end must me 'yyyy-mm-dd'
    def load(self, start=None, end=None):
        f = open(self.path)
        r = csv.reader(f)
        # A dictionary that each elment is a list
        data_all = dict(time=[], contract=[], open=[], high=[], low=[],
                        close=[], volume=[], delta=[])
        if start is None and end is None:
            for data in r:
                if data[0] != '' and data[0] != 'time':
                    data_all['time'].append(data[0])
                    data_all['contract'].append(data[1])
                    data_all['open'].append(int(data[2]))
                    data_all['high'].append(int(data[3]))
                    data_all['low'].append(int(data[4]))
                    data_all['close'].append(int(data[5]))
                    data_all['volume'].append(int(data[6]))
                    data_all['delta'].append(int(data[7]))
            f.close()

            return data_all
        else:
            for data in r:
                if data[0] != '' and data[0] != 'time':
                    data[0] = str(parse(data[0]).date())
                    if start <= data[0] <= end:
                        data_all['time'].append(data[0])
                        data_all['contract'].append(data[1])
                        data_all['open'].append(int(data[2]))
                        data_all['high'].append(int(data[3]))
                        data_all['low'].append(int(data[4]))
                        data_all['close'].append(int(data[5]))
                        data_all['volume'].append(int(data[6]))
                        data_all['delta'].append(int(data[7]))
            f.close()

            return data_all


a = AssetDataLoader()
asset_data_period = a.load(start='2021-03-01', end='2021-03-16')
asset_data_all = a.load()

# A list that each elemnt is an dictonary
#        for i in range(1, len(data_all)):
#            data_all[i][0] = str(parse(data_all[i][0]).date())
#            tmp = dict(time = data_all[i][0],
#                       contract = data_all[i][1],
#                       open = float(data_all[i][2]),
#                       high = float(data_all[i][3]),
#                       low = float(data_all[i][4]),
#                       close = float(data_all[i][5]),
#                       volume = int(data_all[i][6]),
#                       delta = float(data_all[i][7]))
#            if start == None and end == None:
#                data_new.append(tmp)
#            elif start <= tmp['time'] <= end:
#                data_new.append(tmp)

# A numpy array, all the type in it must be same
#        if start == None and end == None:
#            for data in r:
#                if data[0] != '' and data[0] != 'time':
#                    data[2] = float(data[2])
#                    data_all.append(data)
#            f.close()
#            
#            return np.array(data_all)[1:]
#        else:
#            for data in r:
#                if data[0] != '' and start <= data[0] <= end:
#                    data_all.append(data)
#            f.close()
