from typing import List
from itertools import product
from DataClasses import Parameter
import numpy as np

class ParameterParser:

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

    # 把使用者設定的batch參數展開，輸出每次single test需要的參數
    def batch_parameters_parse(input_parameters: List[Parameter]) -> List[List[Parameter]]:

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

"""
p1 = Parameter(name='color', type='cat', value=['red', 'black'])
p2 = Parameter(name='xyz', type='cat', value=['x', 'y', 'z'])
p3 = Parameter(name='height', type='num', value=[1, 5, 1])

print(ParameterParser.batch_parameters_parse([p1, p3]))
"""

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
