import pandas as pd
import numpy as np
import sys
import os
from dataclasses import dataclass
sys.path.insert(1, os.path.join(sys.path[0], '../..'))

from DataClasses import Parameter
#from Algorithm import Algorithm as algo
import Algorithm as algo
from AssetData import AssetDataLoader 

class BH(algo.Algorithm):
    args = [
        Parameter(name='product', type='cat', value=['TXF']),
        Parameter(name='long/short', type='cat', value=['long', 'short'])
    ]

    def __init__(self, **kwargs):
        self.init()
        print("init bh")
        #a = AssetDataLoader(id=0, start=self.start_date, end=self.end_date)
        self.preprocess()
        self.strategy_name = "BH"

    def preprocess(self):
        for idx in range(len(self.data)):
            if idx+1 < len(self.data):
                self.data[idx]['is_ltd'] = (self.data[idx]['contract'] != self.data[idx+1]['contract'])
            else:
                self.data[idx]['is_ltd'] = False


    def applyTradeLogic(self):
        ls = self.cat_param['long/short']
        state = 'Empty'
        for row in self.runtime_data:
            if state == "Empty":
                self.addTrade(row['time'], ls=='long', 1, row['open'])
                state = "Entered"
            elif state == "Entered" and row['is_ltd']:
                self.addTrade(row['time'], ls=='short', 1, row['close'], 'expire')
                state = "Empty"

    def print_trade_list(self):
        print(self.tradelist)


""" 
bh = BH()
bh.set_parameter([Parameter('long/short', 'cat', 'long')])
bh.run()
bh.print_trade_list() 
"""