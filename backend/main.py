from flask import Flask, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
from DataFileManager import DataFileManager



app = Flask(__name__)
cors = CORS(app)


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

@app.route('/get-all-report', methods=['get'])
def get_all_report():
    try:
        df_manager = DataFileManager()
        res = df_manager.get_all_report()
        return jsonify({"code": 2, "msg": "Success get all report_info", "data": res})
    except:
        return jsonify({"code": 0, "msg":"Some uncertain err occur when requesting all the report_info", "data":None})

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

# @app.route('/getReportList', methods=['get'])
# def get_report_list(algo_id):
#     raise NotImplementedError

# @app.route('/createReport', methods=['get', 'post'])
# def create_report(title):
#     raise NotImplementedError

# @app.route('/delete-report/<report_id>', method=['DELETE'])
# def delete_report(report_id):
#     try:
#         df_manager.delete_report(report_id)
#         return jsonify({"code": 3, "msg": "Deleted report No. {}".format(report_id), "data": None})
#     except:
#         return jsonify({"code": 0, "msg": "Error Deleting report", "data": None})


# @app.route('/save-report', method=['POST'])
# def save_report():
#     args = request.args.to_dict()
#     report_id = args.pop("report_id", None)
#     md_content = args.pop("content", None)
#     if report_id is None or md_content is None:
#         return jsonify({"code": 0, "msg": "Invalid input in 'save-report'", "data": None})
#     try:
#         report_id = df_manager.save_report(report_id, md_content)
#         if report_id == -1:
#             return jsonify({"code": 0, "msg": "Error saving report", "data": None})
#         return jsonify({"code": 3, "msg": "Saved report No. {}".format(report_id)}, "data": None)
#     except:
#         return jsonify({"code": 0, "msg": "Error saving report", "data": None})



