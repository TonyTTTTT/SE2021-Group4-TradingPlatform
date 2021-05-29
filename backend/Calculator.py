from typing import List
from DataClasses import TradeAction, TradeResult
import DataFileManager


class Account:
    """
    inner class for calculating trade results of a specific product.
    using FIFO method to calculate profits.
    """
    def __init__(self, product_id):
        fm = DataFileManager()
        self.product = fm.get_product_info(product_id)
        self.long = []
        self.short = []

    def add_trade(self, trade: TradeAction, slip=0) -> List[TradeResult]:
        out = []
        trade_profit = 0
        is_enter = True
        trade_size = abs(trade.position)

        if trade.position > 0:
            # offseting short positions
            while len(self.short) and trade_size:
                trade_profit += self.short.pop(0) - trade.price - slip*2
                trade_size -= 1
                out.append(self._make_trade_result(trade, is_enter=False, profit=trade_profit, is_long=True))
            # adding new long positions
            while trade_size:
                self.long.append(trade.price)
                out.append(self._make_trade_result(trade, is_enter=True, profit=0, is_long=True))

        elif trade.position < 0:
            # offseting long positions
            while len(self.long) and trade_size:
                trade_profit += trade.price - self.long.pop(0)  - slip*2
                trade_size -= 1
                out.append(self._make_trade_result(trade, is_enter=False, profit=trade_profit, is_long=False))
            # adding new short positions
            while trade_size:
                self.short.append(trade.price)
                out.append(self._make_trade_result(trade, is_enter=True, profit=0, is_long=False))

        return out


    def _make_trade_result(self, trade, is_enter, profit, is_long) -> TradeResult:
        return TradeResult( product_id  = trade.product_id,
                            time        = trade.datetime, # TODO: adjust to yyyymmdd as int
                            is_long     = is_long,
                            is_enter    = is_enter,
                            price       = trade.price,
                            profit      = profit,
                            real_profit = profit * self.product.unit * self.product.exchange_rate,
                            tag         = trade.tag )


class Calculator:
    def __init__(self):
        self.slip = 0

    def set_slip(self, slip):
        self.slip = slip

    def calculate(self, trade_actions: List[TradeAction]) -> List[TradeResult]:
        """
        calculate TradeResult for TradeActions
        """
        tr = []
        account = {}
        for ta in trade_actions:
            if ta.product_id not in products:
                account[ta.product_id] = Account(ta.product_id)
                
            tr += account[ta.product_id].add_trade(ta, slip=self.slip)

        return tr

