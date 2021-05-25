import pandas as pd
import numpy as np
import sys
import os

sys.path.insert(1, os.path.join(sys.path[0], '..'))
import summary as sm
import strategy as st
from data import getProduct


class BH(st.Strategy):
    args = [
        st.select_arg('資料源', 'source', {
            'TXF': '台指近',
        }),
        st.select_arg('多空', 'long_short', {'long': '多', 'short': '空'}),
    ]

    def __init__(self, **kwargs):
        self.init()
        self.initarg(**kwargs)
        self.init_current_oi()
        self.preprocess()
        self.setStrategyName("BH")

    def preprocess(self):
        self.setProduct(self.cat_arg['source'])
        self.data = self.data.dropna()
        self.getLTD()

    def applyTradeLogic(self, df):
        ls = self.cat_arg['long_short']
        state = 'Empty'
        for row in df.reset_index().to_dict("records"):
            if state == "Empty":
                self.addTrade(row['time'], ls == 'long', 1, row['open'])
                state = "Entered"
            elif state == "Entered" and row['LTD']:
                self.addTrade(row['time'], ls == 'short', 1, row['close'], 'expire')
                state = "Empty"


if __name__ == "__main__":
    test = BH()
    test.run()
    test.to_csv("test.csv")
