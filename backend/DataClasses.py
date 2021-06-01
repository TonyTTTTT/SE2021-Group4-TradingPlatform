from dataclasses import dataclass
from typing import List
from datetime import datetime


# AlgoInfo
@dataclass
class AlgoInfo:
    id: int
    title: str
    version: str
    description: str
    lastModified: str
    path: str
    apply_product: str
    parameter_set_id: int

    # class_name: str


# Parameters
@dataclass
class Parameter:
    name: str
    type: str  # "cat" or "num"
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
    lastModified: str
    path: str
    algo_title:str


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
    time: datetime
    position: int
    price: float
    tag: str


@dataclass
class TradeResult:
    product_id: int
    time: datetime
    time_stamp: str
    net_position: int
    is_long: bool
    is_enter: bool
    price: float
    profit: float
    real_profit: float
    tag: str


@dataclass
class TradeStat:
    stat: str
    value: float


@dataclass
class TestResult:
    trade_results: List[TradeResult]
    trade_stats: List[TradeStat]
