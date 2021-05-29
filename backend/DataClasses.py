from dataclasses import dataclass
from typing import List
import datetime


# AlgoInfo
@dataclass
class AlgoInfo:
    id: int                
    title: str              
    version: str
    description: str
    lastModified : str
    path: str         
    apply_product: str
    parameter_set_id: int
                
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
    time: str  # ??????
    is_long: bool  # True: ???買�?��m, False: ???�?後買
    is_enter: bool  # True: ??�場, False: ?��?��
    price: float  # ??�格
    profit: float  # ?��?�� (?��?��??��??)
    tag: str  # 交�?��?�籤


@dataclass
class TradeStat:
    stat: str
    value: float


@dataclass
class TestResult:
    trade_results: List[TradeResult]
    trade_stats: List[TradeStat]
