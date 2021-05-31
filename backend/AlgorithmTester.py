from typing import List
from importlib import import_module
import inspect
from DataFileManager import DataFileManager
from DataClasses import *


class AlgorithmTester:
    def __init__(self):
        self.loaded_algo = {}  # 儲存已經載入過的 algo

    def single_test(self, algo_id: int, start_date: str, end_date: str, parameters: List[Parameter]) -> List[TradeAction]:

        algo = self._create_algo(algo_id)
        algo.set_product_date(start_date=start_date, end_date=end_date)
        algo.set_parameter(parameters)

        tas = algo.run()

        return tas

    def batch_test(self, algo_id, algo_version, batch_parameter):
        for ps in parameter_parser.parse_batch(batch_parameter):  # 用 `parameter_parser.parse_batch()` 抽取單一參數
            ta = self.single_test(algo_id, algo_version, ps)  # 執行 sigle test
            yield calculator.get_batch_result(ta)  # 用 `calculator` 產生 sigle test 的 trade_result

    def _create_algo(self, algo_id: int):

        if algo_id not in self.loaded_algo:

            df_manager = DataFileManager()
            algo_info = df_manager.get_algo_info(algo_id)

            module_name = algo_info['path'].rsplit('.', 1)[0].replace('/', '.')
            mod = import_module(module_name)
            cls = inspect.getmembers(mod, inspect.isclass)
            class_name = next(filter(lambda x: x[1].__module__ == module_name, cls), None)[0]
            algo_class = getattr(mod, class_name)
            self.loaded_algo[algo_id] = algo_class

        algo = self.loaded_algo[algo_id]()

        return algo

# Test
tas = AlgorithmTester().single_test(0, '2000-05-01', '2001-05-01', [Parameter('long/short', 'cat', 'long')])
print(tas)
