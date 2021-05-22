from dataclasses import dataclass
from typing import List

@dataclass
class ParameterSet:
    id: int
    algo_id: int
    parameters: list[ParameterValue]

@dataclass
class ParameterValue:
    type: str
    value: object