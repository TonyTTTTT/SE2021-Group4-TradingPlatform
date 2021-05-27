import atexit
import json
import os
import time
from pathlib import Path

from DataClasses import ReportInfo
from utils import META_INFO_PATH, PRODUCT_INFO_PATH, REPORT, ALGO_ID, ID, REPORT_DIR


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class DataFileManager(metaclass=Singleton):
    def __init__(self):
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

    def _generate_algo_id(self) -> int:
        """
        output:
            * an unique algo_id: int
        """
        return int(time.time() * 100)

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
        return self.data["report"]

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
        report_ids = self.algo_id2report_ids[algo_id]
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
            report_info = ReportInfo(report_id, algo_id, title, str(report_path), time.asctime(time.localtime()))
            self.data[REPORT].append(report_info.__dict__)
            self.algo_id2report_ids[algo_id].append(report_id)
            self.report_id2report_info[report_id] = report_info.__dict__
            return report_id
        else:
            return None

    def get_algo_info(self, algo_id: int):
        return {'title': 'hi', 'version': '1.0', 'apply_product': 'hi', 'parameter_set_id': 123}
        # print(self.data['algo'])
        # return next(filter(lambda algo: algo['id'] == algo_id, self.data['algo']), None)

    def get_parameter_set(self, parameter_set_id: int):
        return {'id': 123, 'algo_id': 0, 'parameters': []}

    def get_algo_info_and_parameters(self, algo_id: int) -> dict:
        algo_info = self.get_algo_info(algo_id)

        parameter_set_id = algo_info['parameter_set_id']
        parameter_set = self.get_parameter_set(parameter_set_id)

        algo_info_and_parameters = {
                'name': algo_info['title'],
                'version': algo_info['version'],
                'product': algo_info['apply_product'],
                'parameter': parameter_set['parameters']
        }

        return algo_info_and_parameters
    
    def get_product_info(self, product_id: int):
        with open(self.product_info_path, 'r') as f:
            self.product_infos = json.load(f)
        for product_info in self.product_infos["product"]:
            if int(product_info['id']) == int(product_id):
                return product_info
        
        return -1



if __name__ == "__main__":
    fm = DataFileManager()
    # fm.delete_report(162202302826)
