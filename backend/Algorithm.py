from typing import List
from Calculator import TradeAction, ProductInfo
from dataclasses import dataclass


class Algorithm: 

    def __init__(self, **kwargs):
        self.init()
        #self.initarg(kwargs)

    def init(self):
        self.tradelist = []
        self.startDate = None 
        self.endDate = None
        a = AssetDataLoader(start=self.setStartDate, end=self.endDate) # startDate 跟 endDate 也在 parameter 裡面嗎？
        self.data = a.load() # data: List[Dict]

    def set_parameter(self, parameter: List[Parameter]):
        self.parameter = parameter

    def setStartDate(self, token):
        self.startDate = datetime.datetime.strptime(token, "%Y-%m-%d").date()

    def setEndDate(self, token):
        self.endDate = datetime.datetime.strptime(token, "%Y-%m-%d").date()

    def run(self) -> List[TradeAction]:
        df = self.data.copy()
        if self.startDate is not None:
            t = self.startDate.strftime("%Y-%m-%d")
            df = df[t:]
        if self.endDate is not None:
            t = self.endDate.strftime("%Y-%m-%d")
            df = df[:t]
        self.runtime_data = df
        self.applyTradeLogic(df) 

        return self.tradelist
    
    @abstractmethod
    def applyTradeLogic(data):
        """
        Defined in each algorithm inherited from this class
        """
        pass

    def addTrade(self, time_stamp, bs, contract, price, tag='', **kwargs):
        if contract == 0:
            return
        if isinstance(time_stamp, pd.Timestamp) or isinstance(time_stamp, datetime.datetime):
            time_stamp = time_stamp.strftime("%Y/%m/%d %H:%M:%S")
        if not isinstance(bs, str):
            bs = "B" if bs else "S"

        self.tradelist.append(TradeAction("TXF", time_stamp, bs, contract, price, tag))
