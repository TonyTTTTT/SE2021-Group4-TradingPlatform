from dataclasses import dataclass
from datetime import datetime


@dataclass
class Product:
    id: int
    name: str
    tick_size: float
    unit: float
    exchange_rate: float
    # or may be datetime.datetime
    start_time: datetime
    end_time: datetime