from dataclasses import dataclass
from typing import List
import datetime


# AlgoInfo
@dataclass
class AlgoInfo:
    id: int                 # 這個 Algorithm 的 ID
    title: str              
    version: str            
    apply_product: str
    parameter_set_id: int
    path: str               # 這個 Algorithm 的檔案路徑
    # class_name: str


# Parameters
@dataclass
class Parameter:
    name: str
    type: str       # "cat" or "num"
    value: object

@dataclass
class ParameterSet:
    id: int
    algo_id: int
    parameters: List[Parameter]


# Report
@dataclass
class ReportInfo:
    id: int
    algo_id: int
    title: str
    path: str
    lastModified: str


# Product
@dataclass
class Product:
    id: int
    name: str
    tick_size: float
    unit: float
    exchange_rate: float



# TradeAction, TradeResult, TestResult, TradeStat
@dataclass
class TradeAction:
    product_id: int
    datetime: str
    position: int
    price: float
    tag: str


@dataclass
class TradeResult:
    product_id: int
    time: str  # 時間
    is_long: bool  # True: 先買後賣, False: 先賣後買
    is_enter: bool  # True: 進場, False: 出場
    price: float  # 價格
    profit: float  # 獲利 (出場才有)
    tag: str  # 交易標籤


@dataclass
class TradeStat:
    stat: str
    value: float


@dataclass
class TestResult:
    trade_results: List[TradeResult]
    trade_stats: List[TradeStat]
