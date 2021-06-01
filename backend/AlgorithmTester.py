import inspect
from importlib import import_module

from DataClasses import *
from DataFileManager import DataFileManager


class AlgorithmTester:
    def __init__(self):
        self.loaded_algo = {}  # 儲存已經載入過的 algo

    def single_test(self, algo_id: int, start_date: str, end_date: str, parameters: List[Parameter]) -> List[
        TradeAction]:

        algo = self._create_algo(algo_id)
        algo.set_product_date(start_date=start_date, end_date=end_date)
        algo.set_parameter(parameters)

        tas = algo.run()

        return tas

    def batch_test(self, algo_id: int, start_date: str, end_date: str, batch_parameter: List[List[Parameter]]) -> List[
        List[TradeAction]]:

        tass = []

        for parameters in batch_parameter:
            tas = self.single_test(algo_id, start_date, end_date, parameters)
            tass.append(tas)

        return tass

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
if __name__ == "__main__":
    tas = AlgorithmTester().single_test(0, '2007-02-15', '2007-04-04', [Parameter('long/short', 'cat', 'long')])
    print(tas)
