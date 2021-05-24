from dataclasses import dataclass
from typing import List
import datetime

# AlgoInfo
@dataclass
class AlgoInfo:
    id                  : int
    title               : str
    version             : str
    class_name          : str
    path                : str
    parameter_set_id    : int
    apply_product       : str

    @staticmethod
    def load_algo_info(algo_id: int) -> 'AlgoInfo':
        pass # TODO

# Parameters
@dataclass
class Parameter:
    type    : str
    value   : object

@dataclass
class ParameterSet:
    id          : int
    algo_id     : int
    parameters  : List[Parameter]

# Report
@dataclass
class ReportInfo:
    id          : int
    algo_id     : int
    title       : str
    path        : str

# Product
@dataclass
class Product:
    id              : int
    name            : str
    tick_size       : float
    unit            : float
    exchange_rate   : float
    # or may be datetime.datetime
    start_time      : datetime
    end_time        : datetime

# TradeAction, TradeResult, TestResult, TradeStat
@dataclass
class TradeAction:
    product_id  : int
    datetime    : str
    position    : int
    price       : float
    tag         : str

@dataclass
class TradeResult:
    product_id  : int
    time        : str       # 時間
    is_long     : bool      # True: 先買後賣, False: 先賣後買
    is_enter    : bool      # True: 進場, False: 出場
    price       : float     # 價格
    profit      : float     # 獲利 (出場才有)
    tag         : str       # 交易標籤

@dataclass
class TradeStat:
    stat    : str
    value   : float

@dataclass
class TestResult:
    trade_results : List[TradeResult]
    trade_stats   : List[TradeStat]
