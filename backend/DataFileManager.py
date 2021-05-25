import atexit
import os
import json

with open("info.json") as f:
    data = json.load(f)

class FileManager():
    def __init__(self):
        self.info_path = "./info.json"
        self.next_algo_id = 0
        self.next_report_id = 0
        self.next_parameter_set_id = 0
        self._load_info()
        atexit.register(self._save_info)

    def _load_info(self):
        """
        load json data from info_path
        """
        with open(self.info_path, 'r') as f:
            self.data = json.load(f)
            self.next_report_id = len(self.data['report'])
            self.next_algo_id = len(self.data['algo'])
            self.next_parameter_set_id = len(self.data['parameter_set'])

    def _save_info(self):
        """
        save json data to info_path
        """
        with open(self.info_path, 'w') as f:
            json.dump(self.data, f, indent=2)

    def save_report(self, content: str, report_id=int) -> int:
        """
        input:
            * content: markdown string
            * report_id: int
        output:
            report id, -1 if fail
        """
        report = self._find_report(report_id)
        if report is None:
            print("report not found")
            return -1
        with open(report['path'], 'w', encoding='utf-8-sig') as f:
            f.write(content)
            print("down writing to", report['path'])
        return report_id

    def _find_report(self, report_id):
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


    
        


if __name__  == "__main__":
    fm = FileManager()
    fm.delete_report(1)


