from flask import Flask, request
from flask_cors import CORS
from datetime import datetime

from AlgorithmTester import AlgorithmTester
from DataFileManager import DataFileManager
from ParameterParser import ParameterParser
from utils import CommonResult, LogLevel
from DataClasses import TradeAction
from Calculator import Calculator

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

@app.route('/get-all-algo', methods=['GET'])
def get_all_algo():
    df_manager = DataFileManager()
    try:
        res = df_manager.get_all_algorithm()
        return CommonResult(LogLevel.INFO, "Success get all Algo_info", res).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Some uncertain err occur when requesting all the report_info",
                            None).to_json()


@app.route('/create-algo', methods=['POST'])
def create_algorithm():
    df_manager = DataFileManager()

    title = request.form.get('title')
    version = request.form.get('version')
    description = request.form.get('description')
    lastModified = request.form.get('lastModified')
    content = request.form.get('content')

    algo_id = df_manager.create_algorithm(title, version, description, lastModified, content)

    if algo_id is not None:
        return CommonResult(LogLevel.INFO, 'Create report', algo_id).to_json()
    else:
        return CommonResult(LogLevel.ERROR, 'Duplicated title').to_json()


@app.route('/update-algo', methods=['POST'])
def update_algorithm():
    df_manager = DataFileManager()

    algo_id = int(request.form.get('algoID'))
    content = request.form.get('content')

    if algo_id is None or content is None:
        return CommonResult(LogLevel.ERROR, "Invalid update ", None).to_json()
    try:
        algo_id = df_manager.update_algorithm(algo_id, content)
        if algo_id == -1:
            return CommonResult(LogLevel.ERROR, "Error saving report", None).to_json()
        return CommonResult(LogLevel.DEBUG, "Update algorithm No. {}".format(str(algo_id)), None).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Error Upadating algorithm", None).to_json()


@app.route('/delete-algo/<algo_id>', methods=['DELETE'])
def delete_algo(algo_id):
    df_manager = DataFileManager()
    print(algo_id)
    try:
        df_manager.delete_algorithm(int(algo_id))
        return CommonResult(LogLevel.INFO, "Deleted algorithm No. {}".format(algo_id), None).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Error Deleting algorithm", None).to_json()


@app.route('/get-report/<report_id>', methods=['get'])
def get_report(report_id):
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


@app.route('/get-algo-info/<algo_id>', methods=['get'])
def get_algo_info(algo_id):
    df_manager = DataFileManager()
    algo_id = int(algo_id)

    try:
        algo_info = df_manager.get_algo_info(algo_id)
        parameters = ParameterParser.parameter_format_parse(algo_info['path'])

        output_dict = {
            'name': algo_info['title'],
            'version': algo_info['version'],
            'algo_id': algo_info['id'],
            'parameter': parameters
        }

        if algo_info is None:
            message = 'Algo info #{} not exists'.format(algo_id)
        else:
            message = 'Get algo info #{} successfully'.format(algo_id)

        return CommonResult(LogLevel.INFO, message, output_dict).to_json()
    except:
        message = 'Fail to get algo info of algo id {} due to uncertain errors'.format(algo_id)
        return CommonResult(LogLevel.ERROR, message, None).to_json()


@app.route('/single-test', methods=['POST'])
def single_test():

    # request.json是送過來的input json
    algo_id     = int(request.json['algo_id'])
    start_date  = request.json['product']['start_date']
    end_date    = request.json['product']['end_date']
    slip        = float(request.json['product']['slip'])
    parameters  = ParameterParser.single_parameters_parse(request.json)

    try:
        tester = AlgorithmTester()
        trade_actions = tester.single_test(algo_id, start_date, end_date, parameters)

        calculator = Calculator()
        calculator.set_slip(slip)
        trade_results = calculator.calculate(trade_actions)

        message = 'Succeed to send trade results for Algo #{}'.format(algo_id)

        return CommonResult(LogLevel.INFO, message, {'tradeResults': trade_results}).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Some uncertain err occur", None).to_json()


@app.route('/batch-test', methods=['POST'])
def batch_test():
    df_manager = DataFileManager()
    tester = AlgorithmTester()

    algo_id = int(request.json.get("algo_id", None))
    start_date = request.json['product']['start_date']
    end_date = request.json['product']['end_date']
    parameters = ParameterParser.batch_parameters_parse(request.json)

    try:
        print(request.json)
        trade_actions = tester.batch_test(algo_id, start_date, end_date, parameters)

        # print(algo_id)
        
        
        # ta = []
        # with open("BH.txt", 'r') as f:
        #     lines = f.readlines()
        #     for line in lines:
        #         time, hmm, bs, price = line.replace("\n", "").split(" ")
        #         a = TradeAction(0, datetime(int(time[:4]), int(time[4:6]), int(time[6:8])), (-1) ** (bs == "S"),
        #                         float(price), "")
        #         ta.append(a)
    
        cal = Calculator()
        cal.set_slip(1)
        tr = cal.calculate(trade_actions)
        ts = cal.get_all_statistics(tr)
        res = {"tradeResult": tr, "tradeStat": ts}

        # print('res: ', res)
        # get the file path of the specific algo
        # alto_tester = AlgorithmTester()
        # algo_test._create_algo(algo_id)
        # algo_tester.single_test()

        return CommonResult(LogLevel.INFO, "Success batch testing",
                            res).to_json()
    except:
        return CommonResult(LogLevel.ERROR, "Some uncertain err occur", None).to_json()


if __name__ == '__main__':
    app.run(debug=True, port=4000)
