from flask import Flask, request
from flask_cors import CORS

from AlgorithmTester import AlgorithmTester
from Calculator import Calculator
from DataFileManager import DataFileManager
from ParameterParser import ParameterParser
from utils import CommonResult, LogLevel

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def index():
    return '<h1>Hello, Flask!</h1>'


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
            return CommonResult(LogLevel.ERROR, "Error saving algoritnm", None).to_json()
        return CommonResult(LogLevel.INFO, "Update algorithm!", None).to_json()
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
        if report != -1:
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

    print("gunicorn")
    try:
        algo_info = df_manager.get_algo_info(algo_id)
        if algo_info is None:
            message = 'Algo info #{} not exists'.format(algo_id)
            return CommonResult(LogLevel.INFO, message, None).to_json()
        
        parameters = ParameterParser.parameter_format_parse(algo_info['path'])

        output_dict = {
            'name': algo_info['title'],
            'version': algo_info['version'],
            'algo_id': algo_info['id'],
            'parameter': parameters
        }


        message = 'Get algo info #{} successfully'.format(algo_id)

        return CommonResult(LogLevel.INFO, message, output_dict).to_json()
    except:
        message = 'Fail to get algo info of algo id {} due to uncertain errors'.format(algo_id)
        return CommonResult(LogLevel.ERROR, message, None).to_json()


@app.route('/single-test', methods=['POST'])
def single_test():
    algo_id = int(request.json['algo_id'])

    start_date = request.json['product']['start_date']
    end_date = request.json['product']['end_date']


    slip = float(request.json['product']['slip'])
    parameters = ParameterParser.single_parameters_parse(request.json)
    # print("algo_id: {}, strat_date: {}, end_date: {}, slip: {}, parameters: {}".format(algo_id, start_date, end_date, slip, parameters))
    # print('start_data: {}, end_date: {}'.format(start_date=='', end_date==None))

    try:
        tester = AlgorithmTester()
        trade_actions = tester.single_test(algo_id, start_date, end_date, parameters)
        # print('tarde_actions: {}'.format(trade_actions))

        if trade_actions ==  -1:
            message = 'Produt not select!'
            return CommonResult(LogLevel.ERROR, message, None).to_json()
        elif trade_actions ==  -2:
            message = 'Start Date or End Date out of range!'
            return CommonResult(LogLevel.ERROR, message, None).to_json()
        elif trade_actions ==  -3:
            message = 'Setting Start Date > End Date is not allowed!'
            return CommonResult(LogLevel.ERROR, message, None).to_json()
        
        calculator = Calculator()
        calculator.set_slip(slip)
        trade_results = calculator.calculate(trade_actions)
        trade_stats = calculator.get_all_statistics(trade_results)
        cumulate_results = calculator.process_trade_results(trade_results)

        message = 'Succeed to send tradeResults and tradeStats for Algo #{}'.format(algo_id)
        output_dict = {
            'cumulateResults': cumulate_results,
            # 'tradeResults': trade_results,
            'tradeStats': trade_stats
        }

        df_manager = DataFileManager()
        product = df_manager.get_product_info(0)

        output_dict['product'] = {}
        output_dict['product']['name'] = 'TXF'
        output_dict['product']['tick_size'] = product.tick_size
        output_dict['product']['unit'] = product.unit
        output_dict['product']['slip'] = slip
        output_dict['product']['exchangeRate'] = product.exchange_rate

        return CommonResult(LogLevel.INFO, message, output_dict).to_json()
    except:
        message = 'Uncertain errors occurred'
        return CommonResult(LogLevel.ERROR, message, None).to_json()


@app.route('/batch-test', methods=['POST'])
def batch_test():
    algo_id = int(request.json.get("algo_id", None))
    start_date = request.json['product']['start_date']
    end_date = request.json['product']['end_date']
    slip = request.json['product']['slip']
    parameters = ParameterParser.batch_parameters_parse(request.json)

    try:
        tester = AlgorithmTester()
        tass = tester.batch_test(algo_id, start_date, end_date, parameters)

        output_list = []

        for tas, pas in zip(tass, parameters):
            calculator = Calculator()
            calculator.set_slip(slip)
            tss = calculator.get_batch_result(tas)

            output_dict = {}
            for ts in tss:
                output_dict[ts.stat] = ts.value

            for pa in pas:
                output_dict[pa.name] = pa.value

            output_list.append(output_dict)

        message = 'Succeed to send trade stats'

        return CommonResult(LogLevel.INFO, message, output_list).to_json()
    except:
        message = 'Uncertain errors occurred'
        return CommonResult(LogLevel.ERROR, message, None).to_json()


if __name__ == '__main__':
    app.run(debug=True, port=4000)
