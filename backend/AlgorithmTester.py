from importlib import import_module
from DataFileManager import DataFileManager
from DataClasses import *


class AlgorithmTester:
    def __init__(self):
        self.loaded_algo = {}  # 儲存已經載入過的 algo

    def single_test(self, algo_id, algo_version, algo_parameter_set):
        algo = self._create_algo(algo_id)  # 從 algo_type 建立一個 algo instance
        algo.set_version(algo_version)  # 設定 algo version
        algo.set_parameter(algo_parameter_set)  # 設定 algo 參數
        trade_actions = algo.run()  # NOTE: run() 是否要帶入 AssetData?
        return trade_actions

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
            algo_class = getattr(mod, algo_info['class_name'])
            self.loaded_algo[algo_id] = algo_class

            """
            algo_type = getattr(  # 讀取 algo 算法，得到一個 algo_type
                import_module(algo_info.path),  # 從 algo_info 取得 algo 所在路徑, import 成 module
                algo_info.class_name  # 從 algo_info 取得 algo class_name, import 成 algo_type,
            )  # 有了 algo_type 後就可以用 algo_type 定義 algo instance
            self.loaded_algo[algo_id] = algo_type  # 儲存已經載入過的 algo
            """
        algo = self.loaded_algo[algo_id]()  # 建立 algo instance NOTE:initialize 時不帶參數
        return algo  # return algo instance
