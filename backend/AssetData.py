from typing import List
from datetime import datetime
import csv


class AssetDataLoader:
    path = '../input-data/TXF.csv'

    # start & end must be 'yyyy-mm-dd'
    def load(self, id: int = 0, start: str = None, end: str = None) -> List[dict]:
        # return -1 : neccesary parameter not provide
        # return -2 : data with spcified paramter not available
        # return -3 : end < start
        if id is None:
            return -1
        if id != 0:
            return -2

        min_date = datetime.fromisoformat('2004-07-01')
        max_date = datetime.fromisoformat('2021-04-22')

        if start != None:
            start = datetime.fromisoformat(start)
        else:
            start = min_date
            
        if end != None:
            end = datetime.fromisoformat(end)
        else:
            end = max_date
        
        if end < start:
            return -3
        elif start < min_date or end > max_date:
            return -2
        
        with open(self.path, 'r') as f:

            # A dictionary that each element is a list
            reader = csv.DictReader(f)

            data_new = []

            for data in reader:

                data['time'] = datetime.fromisoformat(data['time'])
                data['open'] = float(data['open'])
                data['high'] = float(data['high'])
                data['low'] = float(data['low'])
                data['close'] = float(data['close'])
                data['volume'] = int(data['volume'])
                data['delta'] = float(data['delta'])

                if start <= data['time'] <= end:
                    data_new.append(data)

        return data_new


if __name__ == "__main__":

    a = AssetDataLoader()
    asset_data_period = a.load(id=0, start='2021-03-01', end='2100-01-01')
    asset_data_all = a.load()
    for row in asset_data_period:
        print(row)
