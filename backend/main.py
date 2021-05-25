from flask import Flask, request, redirect, url_for, jsonify, send_from_directory
<<<<<<< HEAD
from flask_cors import CORS
=======
from DataFileManager import DataFileManager
>>>>>>> origin


app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def index():
    return '<h1>Hello, Flask!</h1>'


@app.route('/report', methods=['GET'])
def reports():
    if 'name' in request.args:
        name = request.args['name']
    else:
        return "Error: no name field provided."

    return send_from_directory('reports', name)

@app.route('/get-all-report-list', method=['GET'])
def get_all_report():
    return

@app.route('/get-report', method=['GET'])
def get_report(report_id:int):
    return

@app.route('/delete-report/<report_id>', method=['DELETE'])
def delete_report(report_id):
    try:
        df_manager.delete_report(report_id)
        return jsonify({"code": 3, "msg": "Deleted report No. {}".format(report_id), "data": None})
    except:
        return jsonify({"code": 0, "msg": "Error Deleting report", "data": None})


@app.route('/save-report', method=['POST'])
def save_report():
    args = request.args.to_dict()
    report_id = args.pop("report_id", None)
    md_content = args.pop("content", None)
    if report_id is None or md_content is None:
        return jsonify({"code": 0, "msg": "Invalid input in 'save-report'", "data": None})
    try:
        report_id = df_manager.save_report(report_id, md_content)
        if report_id == -1:
            return jsonify({"code": 0, "msg": "Error saving report", "data": None})
        return jsonify({"code": 3, "msg": "Saved report No. {}".format(report_id)}, "data": None)
    except:
        return jsonify({"code": 0, "msg": "Error saving report", "data": None})



