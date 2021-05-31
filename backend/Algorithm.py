import datetime
from abc import abstractmethod
from typing import List

from AssetData import AssetDataLoader
from DataClasses import Parameter, TradeAction


class Algorithm: 

    def __init__(self, **kwargs):
        self.init()
        #self.initarg(kwargs)

    def init(self):
        self.tradelist = []
        self.cat_param = {}
        self.num_param = {}
        self.start_date = None 
        self.end_date = None
        #a = AssetDataLoader() 
        #self.data = a.load(start=self.start_date, end=self.end_date) # data: List[Dict]

    def set_parameter(self, parameters: List[Parameter]):
        self.parameters = parameters
        self.parse_param()
        print("cat para: ", self.cat_param)

    def parse_param(self):
        for param in self.parameters:
            if param.type == 'cat':
                self.cat_param[param.name] = param.value
            elif param.type == 'num':
                self.num_param[param.name] = param.value

    # def set_start_date(self, token):
    #     self.start_date = datetime.datetime.strptime(token, "%Y-%m-%d").date()

    # def set_end_date(self, token):
    #     self.end_date = datetime.datetime.strptime(token, "%Y-%m-%d").date()

    def set_product_date(self, start_date=None, end_date=None):
        data_loader = AssetDataLoader()
        data_loader.load(start=start_date, end=end_date)

    def run(self) -> List[TradeAction]:
        a = AssetDataLoader()
        self.data = a.load(start=self.start_date, end=self.end_date) 
        self.runtime_data = self.data.copy()
        """         
        if self.start_date is not None:
            t = self.start_date.strftime("%Y-%m-%d")
            df = df[t:]
        if self.end_date is not None:
            t = self.end_date.strftime("%Y-%m-%d")
            df = df[:t] 
        """
        self.applyTradeLogic() 

        return self.tradelist
    
    @abstractmethod
    def applyTradeLogic(self):
        """
        Defined in each algorithm inherited from this class
        """
        pass

    def addTrade(self, time_stamp, bs, contract, price, tag='', **kwargs):
        if contract == 0:
            return
        # if isinstance(time_stamp, datetime.datetime):
        #     time_stamp = time_stamp.strftime("%Y/%m/%d %H:%M:%S")
        if not isinstance(bs, str):
            pos = 1 if bs else -1

        self.tradelist.append(TradeAction(0, time_stamp, pos, price, tag))

