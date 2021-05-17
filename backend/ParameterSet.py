from dataclasses import dataclass
from typing import List

@dataclass
class ParameterSet:
    id: int
    algo_id: int
    parameters: List

@dataclass
class ParameterValue:
    id: int
    type: str
    value: object