import numpy as np
from datetime import datetime
from dateutil.relativedelta import relativedelta
from typing import List
from DataClasses import TradeAction, TradeResult, TradeStat
from DataFileManager import DataFileManager

@dataclass
class Mdd:
    start_time: datetime
    end_time: datetime
    mdd: float
    start_profit: float

@dataclass
class Net:
    time: datetime
    profit: float

class Account:
    """
    inner class for calculating trade results of a specific product.
    using FIFO method to calculate profits.
    """
    def __init__(self, product_id):
        df_manager = DataFileManager()
        self.product = df_manager.get_product_info(product_id)
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
                trade_profit += self.short.pop(0) - trade.price - 2*slip*self.product.tick_size
                trade_size -= 1
                out.append(self._make_trade_result(trade, is_enter=False, profit=trade_profit, is_long=True))
            # adding new long positions
            while trade_size:
                self.long.append(trade.price)
                out.append(self._make_trade_result(trade, is_enter=True, profit=0, is_long=True))

        elif trade.position < 0:
            # offseting long positions
            while len(self.long) and trade_size:
                trade_profit += trade.price - self.long.pop(0)  - 2*slip*self.product.tick_size
                trade_size -= 1
                out.append(self._make_trade_result(trade, is_enter=False, profit=trade_profit, is_long=False))
            # adding new short positions
            while trade_size:
                self.short.append(trade.price)
                out.append(self._make_trade_result(trade, is_enter=True, profit=0, is_long=False))

        return out

    def _make_trade_result(self, trade, is_enter, profit, is_long) -> TradeResult:
        return TradeResult( product_id  = trade.product_id,
                            time        = trade.datetime, 
                            net_position     = len(self.long) - len(self.short),
                            is_long     = is_long,
                            is_enter    = is_enter,
                            price       = trade.price,
                            profit      = profit,
                            real_profit = profit * self.product.unit * self.product.exchange_rate,
                            tag         = trade.tag )


class Calculator:
    def __init__(self):
        self._slip = 0
        self._mdd_count = 5

    def set_slip(self, slip):
        self._slip = slip

    def set_mdd_count(self, mdd_count):
        self._mdd_count = mdd_count

    def calculate(self, trade_actions: List[TradeAction]) -> List[TradeResult]:
        """
        calculate TradeResult for TradeActions
        """
        df_manager = DataFileManager()
        tr = []
        traded_product = []
        account = {}
        for ta in trade_actions:
            if ta.product_id not in products:
                account[ta.product_id] = Account(ta.product_id)
                traded_product.append(df_manager.get_product_info(ta.product_id))
                
            tr += account[ta.product_id].add_trade(ta, slip=self.slip)
        self._adjust_point(tr, traded_product)
        return tr

    def _adjust_point(self, trade_results: List[TradeResult], traded_product: List[Product]):
        """
        if more than one products are treded, adjust profit of each trade result
        to the product with the largest unit.

        ex:

        if
        * product1 has unit 200
        * product2 has unit 300
        
        then adjust profits of product1 by multiplying 2/3.

        """
        if len(traded_product) < 2:
            return
        max_unit = max(map(lambda x: x.unit * x.exchange_rate, traded_product))
        for tr in trade_results:
            tr.profit = tr.real_profit / max_unit

    def get_all_statistics(self, trade_results: List[TradeResult]) -> List[TradeStat]:
        profit             = list(map(lambda x: x.profit, trade_results))
        net_position       = list(map(lambda x: x.net_position, trade_results))
        real_profit        = list(map(lambda x: x.real_profit, trade_results))
        is_exit            = list(map(lambda x: not x.is_enter, trade_results))
        is_win             = list(map(lambda x: x.profit>0, trade_results))
        time               = list(map(lambda x: x.time, trade_results))
        mdd_point          = self.get_mdd_point(trade_results)
        start_time         = min(time)
        end_time           = max(time)
        total_real_profit  = sum(real_profit)
        total_profit       = sum(profit)
        years              = relativedelta(end_time, start_time).years
        annual_real_profit = total_real_profit / max(1, years)
        annual_profit      = total_profit / max(1, years)
        trade_cnt          = sum(is_exit)
        win_cnt            = sum(is_win)
        loss_cnt           = trade_cnt - loss_cnt
        win_profit         = 0 if len(profit) == 0 else np.dot(profit, is_win)
        loss_profit        = win_profit - total_profit
        avg_win            = win_profit / max(win_cnt, 1)
        avg_loss           = loss_profit / max(loss_cnt, 1)
        exp                = total_profit / max(trade_cnt, 1)
        win_rate           = win_cnt / max(trade_cnt, 1)
        win_loss_ratio     = 0 if avg_loss == 0 else (avg_win / avg_loss)
        annual_pm          = annual_profit / max(mdd_point, 1)
        pm                 = total_profit / max(mdd_point, 1)
        q0                 = 0 if len(profit) == 0 else max(profit)
        q1                 = 0 if len(profit) == 0 else np.quantile(profit, 0.25, interpolation = 'midpoint')
        q2                 = 0 if len(profit) == 0 else np.quantile(profit, 0.25, interpolation = 'midpoint')
        q3                 = 0 if len(profit) == 0 else np.quantile(profit, 0.25, interpolation = 'midpoint')
        q4                 = 0 if len(profit) == 0 else min(profit)
        rng                = q4 - q0
        std                = 0 if len(profit) == 0 else np.std(profit)
        return [
            TradeStat("開始時間", start_time),
            TradeStat("結束時間", end_time),
            TradeStat("總獲利", total_real_profit),
            TradeStat("總獲利點", total_profit),
            TradeStat("年均獲利", round(annual_real_profit, 2)),
            TradeStat("年均獲利點", round(annual_profit, 2)),
            TradeStat("最大回檔", round(mdd[0].mdd, 2)),
            TradeStat("最大回檔點", mdd_point),
            TradeStat("交易次數", trade_cnt),
            TradeStat("期望值", round(exp, 2)),
            TradeStat("獲利次數", win_cnt),
            TradeStat("平均獲利", avg_win),
            TradeStat("虧損次數", loss_cnt),
            TradeStat("平均虧損", round(avg_loss, 2)),
            TradeStat("勝率", round(win_rate, 2)),
            TradeStat("賺賠比", round(win_loss_ratio, 2)),
            TradeStat("年均獲利/最大回檔", round(annual_pm, 2)),
            TradeStat("總獲利/最大回檔", round(pm, 2)),
            TradeStat("最大淨多單", max(pos, 0)),
            TradeStat("最大淨空單", min(pos, 0)),
            TradeStat("Profit - Min", q0)
            TradeStat("Profit - Q1", q1),
            TradeStat("Profit - Medium", q2),
            TradeStat("Profit - Q3", q3),
            TradeStat("Profit - Max", q4),
            TradeStat("Profit - Range", rng),
            TradeStat("Profit - Std", std),
        ] + self.get_mdd_stat(trade_results)

    def get_mdd_stat(self, trade_results: List[TradeResult]) -> List[TradeStat]:
        mdd = self.get_mdd_list(trade_results)
        out = []
        for i in range(len(mdd)):
            out.append(TradeStat("MDD{}".format(i+1), mdd[i].mdd))
            out.append(TradeStat("MDD{} 起始時間".format(i+1), mdd[i].start_time))
            out.append(TradeStat("MDD{} 結束時間".format(i+1), mdd[i].end_time))
            out.append(TradeStat("MDD{} 起始金額".format(i+1), mdd[i].start_profit))
        return out

    def get_mdd_point(self, trade_results: List[TradeStat]) -> float:
        net = self._get_profit_by_time(trade_results, is_real=False)
        mdd = 0
        max_profit = 0
        for i in net:
            max_profit = max(max_profit, i.profit)
            mdd = max_profit - i.profit
        return mdd

    def get_mdd_list(self, trade_results: List[TradeResult]) -> List[Mdd]:
        mdd = []
        profit_by_time = self._get_profit_by_time(trade_results)
        max_profit = 0
        cur_dd = 0
        start_time = min(map(lambda x: x.time, trade_results))
        start_profit = 0
        # calculate all mdd
        for cur in profit_by_time:
            max_profit = max(max_profit, cur.profit)
            cur_dd = max(cur_dd, max_profit - cur.profit)
            if max_profit == cur.profit:
                out.append(Mdd(start_time   : start_time,
                               end_time     : cur.time,
                               mdd          : cur_dd,
                               start_profit : start_profit))
                cur_dd = 0
                start_time = cur.time
                start_profit = cur.profit
        # sort mdd large -> small
        mdd.sort(key=lambda x: x.mdd, reverse=True)
        # append mdd to _mdd_count
        if len(mdd) < self._mdd_count:
            null_mdd = #pass
            mdd += [null_mdd] * (self._mdd_count-len(mdd))
        # finally
        return mdd

    def _get_profit_by_time(self, trade_results: List[TradeResult], is_real=True) -> List[Net]:
        if len(trade_results) == 0:
            return []
        net = lambda x: Net(x.time, x.real_profit if is_real else x.profit)
        out = [net(trade_results[0])]
        for tr in trade_results[1:]:
            n = net(tr)
            n.profit += out[-1].profit
            out.append(n)
        return out



