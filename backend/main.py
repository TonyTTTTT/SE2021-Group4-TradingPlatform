from flask import Flask, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
from DataFileManager import DataFileManager
from utils import CommonResult, LogLevel, META_INFO_PATH
import json

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def index():
    return '<h1>Hello, Flask!</h1>'

@app.route('/get-report/<report_id>', methods=['get'])
def get_report(report_id: int):
    df_manager = DataFileManager()
    report_id = int(report_id)
    try:
        report = df_manager.get_report(report_id)
        if (report != -1):
            return CommonResult(LogLevel.INFO, "Success get the report of report_id:{}".format(report_id),
                                report).to_json()
        else:
            return CommonResult(LogLevel.INFO, "The report of report_id:{} not exist".format(report_id), None).to_json()
    except:
        return CommonResult(LogLevel.ERROR,
                            "Some uncertain err occur when requesting the report of report_id:{}".format(report_id),
                            None).to_json()


@app.route('/get-all-report', methods=['get'])
def get_all_report():
    df_manager = DataFileManager()
    try:
        res = df_manager.get_all_report()
        return CommonResult(LogLevel.INFO, "Success get all report_info", res).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Some uncertain err occur when requesting all the report_info",
                            None).to_json()


@app.route('/get-report-list', methods=['get'])
def get_report_list():
    df_manager = DataFileManager()
    algo_id = request.values.get('algo_id')
    report_list = df_manager.get_report_list(int(algo_id))
    return CommonResult(LogLevel.INFO, 'Loaded report list', report_list).to_json()


@app.route('/create-report', methods=['post'])
def create_report():
    df_manager = DataFileManager()
    title = request.form.get('title')
    algo_id = request.form.get('algo_id')
    report_id = df_manager.create_report(title, int(algo_id))
    if report_id is not None:
        return CommonResult(LogLevel.INFO, 'Create report', report_id).to_json()
    else:
        return CommonResult(LogLevel.ERROR, 'Duplicated title').to_json()


@app.route('/save-report', methods=['POST'])
def save_report():
    df_manager = DataFileManager()
    report_id = request.json.get("report_id", None)
    md_content = request.json.get("content", None)
    if report_id is None or md_content is None:
        return CommonResult(LogLevel.ERROR, "Invalid input in 'save-report'", None).to_json()
    try:
        report_id = df_manager.save_report(report_id, md_content)
        if report_id == -1:
            return CommonResult(LogLevel.ERROR, "Error saving report", None).to_json()
        return CommonResult(LogLevel.DEBUG, "Saved report No. {}".format(report_id), None).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Error saving report", None).to_json()


@app.route('/delete-report/<report_id>', methods=['DELETE'])
def delete_report(report_id):
    df_manager = DataFileManager()
    try:
        df_manager.delete_report(int(report_id))
        return CommonResult(LogLevel.INFO, "Deleted report No. {}".format(report_id), None).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Error Deleting report", None).to_json()

# NOTE:
# 雖然叫做 get-algo-info，但是實際上傳送的資料不是 AlgoInfo 這個 class，
# 而是還會透過 parameter_set_id 將 parameters 展開來（廣義的algo info）
@app.route('/get-algo-info/<algo_id>', methods=['get'])
def get_algo_info(algo_id):
    df_manager = DataFileManager()
    algo_id = int(algo_id)
    try:
        algo_info_and_parameters = df_manager.get_algo_info_and_parameters(algo_id)
        message = 'Get algo info of algo id {} successfully'.format(algo_id)
        return CommonResult(LogLevel.INFO, message, algo_info_and_parameters).to_json()
    except:
        message = 'Fail to get algo info of algo id {} due to uncertain errors'.format(algo_id)
        return CommonResult(LogLevel.ERROR, message, None).to_json()


@app.route('/single-test', methods=['post'])
def single_test():
    df_manager = DataFileManager()
    try:
        print(request.json)
        return CommonResult(LogLevel.INFO, "Success single testing", None).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Some uncertain err occur", None).to_json()
    
    
if __name__ == '__main__':
    app.run(debug=True, port=4000)
