from typing import List
from itertools import product
import numpy as np
from DataClasses import Parameter

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

    ret = []
    for t in product(*input_parameter_list_list):
        ret.append(list(t))

    return ret

""" Test
p1 = Parameter(name='color', type='cat', value=['red', 'black'])
p2 = Parameter(name='xyz', type='cat', value=['x', 'y', 'z'])
p3 = Parameter(name='height', type='num', value=[1, 5, 1])
print(batch_parameters_parse([p1, p2, p3]))
"""
