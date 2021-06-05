import atexit
import json
import os
import time
import threading
from pathlib import Path

from DataClasses import ReportInfo, AlgoInfo, Product
from utils import META_INFO_PATH, REPORT, ALGO_ID, ID, REPORT_DIR, ALGO_DIR, PRODUCT_INFO_PATH, ALGO

lock = threading.Lock()

class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            with lock:
                if cls not in cls._instances:
                    cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class DataFileManager(metaclass=Singleton):
    def __init__(self):
        print("== init ==")
        self.info_path = META_INFO_PATH
        self.product_info_path = PRODUCT_INFO_PATH
        self._load_info()
        atexit.register(self._save_info)

    def _load_info(self):
        """
        load json data from info_path
        """
        if os.stat(self.info_path).st_size == 0:
            self.data = {"algo": [], "report": [], "parameter_set": []}
        else:
            with open(self.info_path, 'r') as f:
                self.data = json.load(f)
        self.algo_id2report_ids = {}
        self.report_id2report_info = {}

        maxAlgoID = 0
        self.next_algo_id = 0
        self.next_report_id = 0

        for i, algo_info in enumerate(self.data[ALGO]):
            maxAlgoID = max(maxAlgoID, algo_info["id"])
            if i == len(self.data[ALGO]) - 1:
                self.next_algo_id = maxAlgoID + 1

        for i, report_info in enumerate(self.data[REPORT]):
            algo_id = report_info[ALGO_ID]
            report_id = report_info[ID]
            self.report_id2report_info[report_id] = report_info
            if algo_id not in self.algo_id2report_ids:
                self.algo_id2report_ids[algo_id] = []
            self.algo_id2report_ids[algo_id].append(report_id)
            if i == len(self.data[REPORT]) - 1:
                self.next_report_id = report_id + 1

    def _save_info(self):
        """
        save json data to info_path
        """
        with open(self.info_path, 'w') as f:
            json.dump(self.data, f, indent=2)
            print("== saved ==")

    def _generate_algo_id(self) -> int:
        """
        output:
            * an unique algo_id: int
        """
        ret_algo_id = self.next_algo_id
        self.next_algo_id += 1
        return ret_algo_id

    def _generate_report_id(self) -> int:
        """
        output:
            * an unique report_id: int
        """
        ret_report_id = self.next_report_id
        self.next_report_id += 1
        return ret_report_id

    def _generate_parameter_set_id(self) -> int:
        """
        output:
            * an unique parameter_set_id: int
        """
        return int(time.time() * 100)

    def get_all_algorithm(self):
        """
        input:
            * void
        output:
            * A list that contain all algo info: list
        """
        return self.data["algo"]

    def create_algorithm(self, title: str, version: str, description: str, lastModified: str, content: str):
        p = Path(ALGO_DIR) / ('algo_'+title)
        p.mkdir(parents=True, exist_ok=True)
        algo_path = Path(ALGO_DIR) / ('algo_'+title) / ('ver_'+ version + '.py')

        exists = algo_path.exists()
        if not exists:
            algo_path.touch()
            algo_id = self._generate_algo_id()

            algo_info = AlgoInfo(algo_id, title, version, description, lastModified, str(algo_path), "test1", "test2")
            self.data[ALGO].append(algo_info.__dict__)
            with open(algo_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return algo_id
        else:
            return None

    def update_algorithm(self, algo_id: int, content: str):
        algorithm = self._find_algorithm(algo_id)

        # modify algo file
        if algorithm is None:
            return -1
        with open(algorithm['path'], 'w', encoding='utf-8') as f:
            f.write(content)
        return

    def delete_algorithm(self, algo_id: int):
        algorithm = self._find_algorithm(algo_id)
        self.data[ALGO] = [algo for algo in self.data[ALGO] if algo['id'] != algo_id]
        if algorithm is not None and os.path.exists(algorithm['path']):
            os.remove(algorithm['path'])
        return

    def _find_algorithm(self, algo_id: int):

        for algo in self.data[ALGO]:
            if algo['id'] == algo_id:
                return algo
        return None

    def get_algo_info(self, algo_id: int):
        return self._find_algorithm(algo_id)

    def save_report(self, report_id: int, content: str) -> int:
        """
        input:
            * content: markdown string
            * report_id: int
        output:
            report id, -1 if fail
        """
        report = self._find_report(report_id)
        if report is None:
            return -1
        with open(report['path'], 'w', encoding='utf-8') as f:
            f.write(content)
        return report_id

    def _find_report(self, report_id: int):
        """
        input:
            * report_id: int
        output:
            if report_id is valid, return report_info dictionary,
            else return None
        """
        return next(filter(lambda report: report['id'] == report_id, self.data['report']), None)

    def delete_report(self, report_id: int) -> None:
        """
        input:
            * report_id: int
        output:
            * None
        """
        report = self._find_report(report_id)
        self.data['report'] = [report for report in self.data['report'] if report['id'] != report_id]
        print(self.data['report'])
        if report is not None and os.path.exists(report['path']):
            os.remove(report['path'])
        print(self.data)

    def get_all_report(self):
        """
        input:
            * void
        output:
            * A list that contain all report info: list
        """
        res = self.data["report"]

        return res

    def get_report(self, report_id: int):
        """
        input:
            * report_id: int
        output:
            * The report content: str
        """
        report_info = self._find_report(report_id)
        if report_info is not None and os.path.exists(report_info['path']):
            with open(report_info['path'], 'r') as f:
                report = f.read()
            return report
        else:
            return -1

    def get_report_list(self, algo_id: int):
        report_ids = self.algo_id2report_ids.get(algo_id, [])
        report_infos = []
        for report_id in report_ids:
            report_infos.append(self.report_id2report_info[report_id])
        return report_infos

    def create_report(self, title, algo_id):
        """
        input:
            * title: report's title
            * algo_id: algo_id that this report relates to
        output:
            report_id: None if fail
        """
        report_path = Path(REPORT_DIR) / (title + '.md')
        exists = report_path.exists()
        if not exists:
            report_path.touch()
            report_id = self._generate_report_id()
            algo = self._find_algorithm(algo_id)
            report_info = ReportInfo(report_id, algo_id, title, time.asctime(time.localtime()), str(report_path),
                                     algo['title'])

            self.data[REPORT].append(report_info.__dict__)
            if algo_id not in self.algo_id2report_ids:
                self.algo_id2report_ids[algo_id] = []
            self.algo_id2report_ids[algo_id].append(report_id)
            self.report_id2report_info[report_id] = report_info.__dict__
            return report_id
        else:
            return None

    def get_product_info(self, product_id: int) -> Product:
        with open(self.product_info_path, 'r') as f:
            self.product_infos = json.load(f)
        for product_info in self.product_infos["product"]:
            if int(product_info['id']) == int(product_id):
                return Product(id=product_info['id'],
                               name=product_info['name'],
                               tick_size=product_info['tickSize'],
                               unit=product_info['unit'],
                               exchange_rate=product_info['exchangeRate'])
        return -1


if __name__ == "__main__":
    fm = DataFileManager()
    pinfo = fm.get_product_info(0)
    print(pinfo)
