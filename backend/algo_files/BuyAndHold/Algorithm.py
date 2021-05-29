import pandas as pd
import numpy as np
import sys
import os
from dataclasses import dataclass

from backend.Algorithm import Algorithm as algo

class BH(algo):

    def __init__(self, **kwargs):
        self.init()
        self.preprocess()
        self.strategy_name = "BH"

    def preprocess(self):
        for idx in range(len(self.data)):
            if idx+1 < len(self.data):
                self.data[idx]['is_ltd'] = (self.data[idx][contract] != self.data[idx+1][contract])
            else:
                self.data[idx]['is_ltd'] = False


    def applyTradeLogic(self, df):
        ls = self.parameter['long_short']
        state = 'Empty'
        for row in self.data:
            if state == "Empty":
                self.addTrade(row['time'], ls=='long', 1, row['open'])
                state = "Entered"
            elif state == "Entered" and row['is_ltd']:
                self.addTrade(row['time'], ls=='short', 1, row['close'], 'expire')
                state = "Empty"