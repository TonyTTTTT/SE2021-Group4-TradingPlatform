from typing import List
from itertools import product
from importlib import import_module
import inspect
from DataClasses import Parameter
import numpy as np


class ParameterParser:

    def parameter_format_parse(filepath: str) -> List[dict]:

        module_name = filepath.rsplit('.', 1)[0].replace('/', '.')
        mod = import_module(module_name)
        cls = inspect.getmembers(mod, inspect.isclass)
        class_name = next(filter(lambda x: x[1].__module__ == module_name, cls), None)[0]
        if class_name is None:
            raise Exception("No class defined in " + filepath)
        classBH = getattr(mod, class_name)

        output_parameters = []

        for parameter in classBH.args:
            output_parameters.append({
                'name': parameter.name,
                'type': parameter.type,
                'value': parameter.value
            })

        return output_parameters

    # 將 input JSON dictionary 中的 parameters 項目轉換成 List[Parameter]
    def single_parameters_parse(input_json: dict) -> List[Parameter]:

        output_parameters = []

        for parameter_dict in input_json['parameter']:
            p = Parameter(
                name=parameter_dict['name'],
                type=parameter_dict['type'],
                value=parameter_dict['value']
            )
            output_parameters.append(p)

        return output_parameters

    def batch_parameters_parse(input_json: dict) -> List[List[Parameter]]:

        input_parameters = []

        for parameter_dict in input_json['parameter']:
            p = Parameter(name=parameter_dict['name'], type=parameter_dict['type'], value=None)
            if p.type == 'cat':
                p.value = parameter_dict['value']
            elif p.type == 'num':
                p.value = [parameter_dict['from'], parameter_dict['to'], parameter_dict['step']]

            input_parameters.append(p)

        input_parameter_list_list = []

        for input_parameter in input_parameters:

            input_parameter_list = []
            all_values = []

            if input_parameter.type == 'cat':
                all_values = input_parameter.value
            elif input_parameter.type == 'num':
                start, stop, step = input_parameter.value
                all_values = np.arange(start, stop, step)

            for this_value in all_values:
                p = Parameter(name=input_parameter.name, type=input_parameter.type, value=this_value)
                input_parameter_list.append(p)

            input_parameter_list_list.append(input_parameter_list)

        output_parameters = []
        for t in product(*input_parameter_list_list):
            output_parameters.append(list(t))

        return output_parameters


# Test #1
"""
input_json = {
    "algo_id": 0,
    "product": {
        "name": "TXF",
        "start_date": '2021-05-01',
        "end_date": '2021-05-02',
        "slip": 1,
    },
    "parameter": [
        {
            "name": "color",
            "type": "cat",
            "value": ["red","black"]
        },
        {
            "name": "height",
            "type": "num",
            "from": 170,
            "to": 175,
            "step": 1
        },
    ]
}

print(ParameterParser.batch_parameters_parse(input_json))
"""

# Test #2
"""
input_json = {
    'algo_id': 0,
    'product': {
        'name': 'TXF',
        'start_date': '2021-05-01',
        'end_date': '2021-05-02',
        'slip': 2.5,       
    },
    'parameter': [
        {
            'name': 'color',
            'type': 'cat',
            'value': 'red'
        },
        {
            'name': 'height',
            'type': 'num',
            'value': 178.5,
        },
    ],
}

print(ParameterParser.single_parameters_parse(input_json))
"""

# Test #3
ret = ParameterParser.parameter_format_parse('algo_files/BuyAndHold/first_version.py')
print(ret)
