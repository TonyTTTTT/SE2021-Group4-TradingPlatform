from algo_files.BuyAndHold.first_version import BH
from DataClasses import Parameter
from Calculator import Calculator

test = BH()
test.set_parameter([
        Parameter("product", "cat", 'TXF'),
        Parameter("long/short", "cat", 'long')
        ])
ta = test.run()
cal = Calculator()
cal.set_slip(1)

tr = cal.calculate(ta)
ts = cal.get_all_statistics(tr)
for i in ts:
    print(i)

