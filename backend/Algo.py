from dataclasses import dataclass

@dataclass
class Algo:
    id: int
    class_name: str
    version: str
    apply_product: str
    parameter_set_id: int
    path: str
