from flask import jsonify

META_INFO_PATH = './info.json'
PRODUCT_INFO_PATH = './product_info.json'
REPORT_DIR = './report_files'
ALGO_DIR = './algo_files'
ALGO = 'algo'
REPORT = 'report'
PARAMETER_SET = 'PARAMETER_SET'
ALGO_ID = 'algo_id'
ID = 'id'


class LogLevel:
    ERROR = 0
    WARNING = 1
    INFO = 2
    DEBUG = 3


class CommonResult:
    def __init__(self, code: int, msg: str, data=None):
        self.code = code
        self.msg = msg
        self.data = data

    def to_json(self):
        return jsonify(code=self.code, msg=self.msg, data=self.data)
