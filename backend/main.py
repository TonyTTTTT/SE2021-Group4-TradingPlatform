from flask import Flask, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS


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