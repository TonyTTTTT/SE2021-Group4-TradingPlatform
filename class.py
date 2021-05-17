from dataclasses import dataclass


@dataclass
class TradeAction():
    product_id : int
    datetime   : Calendar
    position   : int
    price      : float
    tag        : str


@dataclass
class TradeResult():
    product_id  : int
    time        : Calendar  # 時間
    is_long     : bool      # True: 先買後賣, False: 先賣後買
    is_enter    : bool      # True: 進場, False: 出場
    price       : float     # 價格
    profit      : float     # 獲利 (出場才有)
    tag         : str       # 交易標籤


@dataclass
class TestResult():
    trade_results : list[TradeResult]
    trade_stats   : list[TradeStat]
