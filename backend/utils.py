import json
from flask import jsonify

META_INFO_PATH = './info.json'
REPORT_DIR = './report_files'
ALGO = 'algo'
REPORT = 'report'
ALGO_ID = 'algo_id'
ID = 'id'


class LogLevel():
    ERROR = 0
    WARNING = 1
    INFO = 2
    DEBUG = 3

class CommonResult:
    def __init__(self, code: int, msg: str, data: object = None):
        self.code = code  # {0: Error, 1: Warning, 2: Info, 3: Debug}
        self.msg = msg  # log message(e.g. code==2:為什麼對)
        self.data = data  # json object

    def to_json(self):
        return jsonify(code=self.code, msg=self.msg, data=self.data)
