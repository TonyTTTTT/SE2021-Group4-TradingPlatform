import sys, os
sys.path.insert(1, os.path.join(sys.path[0], '../..'))

from Algorithm import Algorithm as Algo
from DataClasses import Parameter
from AssetData import AssetDataLoader


class_name = 'BH'

class BH(Algo):
    args = [
        Parameter(name='product', type='cat', value=['TXF']),
        Parameter(name='long/short', type='cat', value=['long', 'short'])
    ]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def preprocess(self):
        for idx in range(len(self.data)):
            if idx + 1 < len(self.data):
                self.data[idx]['is_ltd'] = (self.data[idx]['contract'] != self.data[idx + 1]['contract'])
            else:
                self.data[idx]['is_ltd'] = False

    def apply_trade_logic(self):
        self.preprocess()
        ls = self.cat_param['long/short']
        state = 'Empty'
        for row in self.runtime_data:
            if state == "Empty":
                self.add_trade(row['time'], ls == 'long', 1, row['open'])
                state = "Entered"
            elif state == "Entered" and row['is_ltd']:
                self.add_trade(row['time'], ls == 'short', 1, row['close'], 'expire')
                state = "Empty"

    def print_trade_list(self):
        print(self.tradelist)

if __name__ == '__main__':
    bh = BH()
    bh.set_parameter([Parameter('long/short', 'cat', 'long')])
    bh.set_product_date(start_date='2007-02-15', end_date='2007-04-04')
    bh.run()
    bh.print_trade_list() 
