from flask import Flask, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
from DataFileManager import DataFileManager
from backend.utils import CommonResult

app = Flask(__name__)
cors = CORS(app)
df_manager = DataFileManager()

@app.route('/')
def index():
    return '<h1>Hello, Flask!</h1>'


# @app.route('/report', methods=['GET'])
# def reports():
#     if 'name' in request.args:
#         name = request.args['name']
#     else:
#         return "Error: no name field provided."

#     return send_from_directory('reports', name)

@app.route('/get-report/<report_id>', methods=['get'])
def get_report(report_id: int):
    report_id = int(report_id)
    try:
        df_manager = DataFileManager()
        report = df_manager.get_report(report_id)
        if(report != -1):
            return jsonify({"code": 2, "msg":"Success get the report of report_id:{}".format(report_id), "data": report})
        else:
            return jsonify({"code": 2, "msg":"The report of report_id:{} not exist".format(report_id), "data":None})
    except:
        return jsonify({"code": 0, "msg":"Some uncertain err occur when requesting the report of report_id:{}".format(report_id), "data":None})


@app.route('/get-all-report', methods=['get'])
def get_all_report():
    try:
        df_manager = DataFileManager()
        res = df_manager.get_all_report()
        return jsonify({"code": 2, "msg": "Success get all report_info", "data": res})
    except:
        return jsonify({"code": 0, "msg":"Some uncertain err occur when requesting all the report_info", "data":None})


@app.route('/getReportList', methods=['get'])
def get_report_list(algo_id):
    report_list = df_manager.get_report_list(algo_id)
    return CommonResult(2, 'ok', report_list).to_json()


@app.route('/createReport', methods=['post'])
def create_report(title, algo_id):
    report_id = df_manager.create_report(title, algo_id)
    if report_id is not None:
        return CommonResult(2, 'ok', report_id).to_json()
    else:
        return CommonResult(0, 'duplicated title').to_json()


@app.route('/save-report', method=['POST'])
def save_report():
    args = request.args.to_dict()
    report_id = args.pop("report_id", None)
    md_content = args.pop("content", None)
    if report_id is None or md_content is None:
        return jsonify({"code": 0, "msg": "Invalid input in 'save-report'", "data": None})


@app.route('/delete-report/<report_id>', method=['DELETE'])
def delete_report(report_id):
    try:
        df_manager.delete_report(report_id)
        return jsonify({"code": 3, "msg": "Deleted report No. {}".format(report_id), "data": None})
    except:
        return jsonify({"code": 0, "msg": "Error Deleting report", "data": None})




if __name__ == '__main__':
    app.run(debug=True)



