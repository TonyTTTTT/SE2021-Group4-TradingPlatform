import atexit
import json
import os
import time
from pathlib import Path

from backend.DataClasses import ReportInfo
from backend.utils import META_INFO_PATH, REPORT, ALGO_ID, ID, REPORT_DIR


class DataFileManager():
    def __init__(self):
        self.info_path = META_INFO_PATH
        self._load_info()
        atexit.register(self._save_info)

    def _load_info(self):
        """
        load json data from info_path
        """
        with open(self.info_path, 'r') as f:
            self.data = json.load(f)
        self.algo_id2report_ids = {}
        self.report_id2report_info = {}
        for report_info in self.data[REPORT]:
            algo_id = report_info[ALGO_ID]
            report_id = report_info[ID]
            self.report_id2report_info[report_id] = report_info
            if algo_id not in self.algo_id2report_ids:
                self.algo_id2report_ids[algo_id] = []
            self.algo_id2report_ids[algo_id].append(report_id)

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
        return int(time.time()*100)

    def _generate_report_id(self) -> int:
        """
        output:
            * an unique report_id: int
        """
        return int(time.time()*100)

    def _generate_parameter_set_id(self) -> int:
        """
        output:
            * an unique parameter_set_id: int
        """
        return int(time.time()*100)


    def create_report(self, title: str, algo_id: int) -> int:
        """
        input:
            * title: report's title
            * algo_id: algo_id that this report relates to
        output:
            report_id: int, -1 if fail
        """
        report_id = self._generate_report_id()
        if report_id == -1:
            return -1
        report_path = "report_files/{}.{}.md".format(algo_id, report_id)
        report = { "id": report_id,
                   "algo_id": algo_id,
                   "title": title,
                   "path": report_path }
        self.data['report'].append(report)
        with open(report_path, 'w', encoding='utf-8-sig') as f:
            f.write("# {}\n".format(title))
        return report_id

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
        with open(report['path'], 'w', encoding='utf-8-sig') as f:
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
        if report is not None and os.path.exists(report['path']):
            os.remove(report['path'])
    
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
        if os.path.exists(report_info['path']):
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
        report_path = Path(REPORT_DIR) / (title + '.md')
        exists = report_path.exists()
        if not exists:
            report_path.touch()
            report_id = self._generate_report_id()
            report_info = ReportInfo(report_id, algo_id, title, str(report_path), time.asctime(time.localtime()))
            self.data[REPORT].append(report_info.__dict__)
            self.algo_id2report_ids[algo_id].append(report_id)
            self.report_id2report_info[report_id] = report_info.__dict__
            self._save_info()
            return report_id
        else:
            return None


if __name__  == "__main__":
    fm = DataFileManager()
    lete_report(162202302826)



