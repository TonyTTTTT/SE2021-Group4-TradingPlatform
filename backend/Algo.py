from DataClasses import *
from dataclasses import dataclass
from typing import List

@dataclass
class Algo:
    id: int
    version: int
    pset: ParameterSet

    def set_version(self, version: int) -> None:
        pass # TODO

    def set_parameters(self, pset: ParameterSet) -> None:
        pass # TODO

    def run(self) -> List[TradeAction]:
        pass # TODO
