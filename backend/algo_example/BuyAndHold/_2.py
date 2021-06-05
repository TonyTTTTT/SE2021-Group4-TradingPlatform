from Algorithm import Algorithm
from DataClasses import Parameter


class BH(Algorithm):
    args = [
        Parameter(name='product', type='cat', value=['TXF']),
        Parameter(name='long/short', type='cat', value=['long', 'short']),
        Parameter(name='Days to maturity', type='num', value='0'),
    ]

    def preprocess(self):
        # setting is_ltd
        for idx in range(len(self.data)):
            if idx + 1 < len(self.data):
                self.data[idx]['is_ltd'] = (self.data[idx]['contract'] != self.data[idx + 1]['contract'])
            else:
                self.data[idx]['is_ltd'] = False
        
        # setting days_to_maturity
        stack = []
        for i in range(len(self.data)):
            self.data[i]['days_to_maturity'] = 99 # default value
            if self.data[i]['is_ltd']:
                self.data[i]['days_to_maturity'] = 0
                days_to_maturity = 1
                while len(stack):
                    j = stack.pop()
                    self.data[j]['days_to_maturity'] = days_to_maturity
                    days_to_maturity += 1
            else:
                stack.append(i)



    def apply_trade_logic(self):
        self.preprocess()
        ls = self.cat_param['long/short']
        state = 'Empty'
        for row in self.runtime_data:
            if (state == "Empty" and row['days_to_maturity'] == self.num_param['Days to maturity']):
                self.add_trade(row['time'], ls == 'long', 1, row['open'])
                state = "Entered"
            elif state == "Entered" and row['is_ltd']:
                self.add_trade(row['time'], ls == 'short', 1, row['close'], 'expire')
                state = "Empty"


