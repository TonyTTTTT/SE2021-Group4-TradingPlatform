import csv
from dateutil.parser import parse
import numpy as np
from datetime import date


class AssetDataLoader:
    path = '../input-data/TXF.csv'

    # start&end must me 'yyyy-mm-dd'
    def load(self, id=0 ,start=None, end=None):
        if start != None and end != None:
            start = date.fromisoformat(start)
            end = date.fromisoformat(end)
        with open(self.path, 'r') as f:
            r = csv.DictReader(f)
            # A dictionary that each elment is a list
            data_new = []
            for data in r:
                # print(data['time'])
                data['time'] = date.fromisoformat(data['time'])
                data['open'] = float(data['open'])
                data['high'] = float(data['high'])
                data['low'] = float(data['low'])
                data['close'] = float(data['close'])
                data['volume'] = int(data['volume'])
                data['delta'] = float(data['delta'])
                if start == None and end == None:
                    data_new.append(data)
                elif start <= data['time'] <= end:
                    data_new.append(data)

            return data_new

if __name__ == "__main__":
    a = AssetDataLoader()
    asset_data_period = a.load(id=0, start='2021-03-01', end='2021-03-16')
    asset_data_all = a.load()

# A list that each elemnt is an dictonary
        # with open(self.path, 'r') as f:
        #     r = csv.DictReader(f)
        #     # A dictionary that each elment is a list
        #     data_new = []
        #     for data in r:
        #         # print(data['time'])
        #         data['time'] = date.fromisoformat(data['time'])
        #         data['open'] = float(data['open'])
        #         data['high'] = float(data['high'])
        #         data['low'] = float(data['low'])
        #         data['close'] = float(data['close'])
        #         data['volume'] = int(data['volume'])
        #         data['delta'] = float(data['delta'])
        #         if start == None and end == None:
        #             data_new.append(data)
        #         elif start <= data['time'] <= end:
        #             data_new.append(data)

# # A dictionary that each elment is a list
# data_all = dict(time=[], contract=[], open=[], high=[], low=[],
#                 close=[], volume=[], delta=[])
# if start is None and end is None:
#     for data in r:
#         if data[0] != '' and data[0] != 'time':
#             data_all['time'].append(data[0])
#             data_all['contract'].append(data[1])
#             data_all['open'].append(int(data[2]))
#             data_all['high'].append(int(data[3]))
#             data_all['low'].append(int(data[4]))
#             data_all['close'].append(int(data[5]))
#             data_all['volume'].append(int(data[6]))
#             data_all['delta'].append(int(data[7]))
#     f.close()

#     return data_all
# else:
#     for data in r:
#         if data[0] != '' and data[0] != 'time':
#             data[0] = str(parse(data[0]).date())
#             if start <= data[0] <= end:
#                 data_all['time'].append(data[0])
#                 data_all['contract'].append(data[1])
#                 data_all['open'].append(int(data[2]))
#                 data_all['high'].append(int(data[3]))
#                 data_all['low'].append(int(data[4]))
#                 data_all['close'].append(int(data[5]))
#                 data_all['volume'].append(int(data[6]))
#                 data_all['delta'].append(int(data[7]))
#     f.close()

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
