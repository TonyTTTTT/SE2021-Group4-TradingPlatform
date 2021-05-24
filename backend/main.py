from flask import Flask, request, redirect, url_for, jsonify, send_from_directory

app = Flask(__name__)


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
