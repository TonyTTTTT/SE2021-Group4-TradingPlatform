from algo_files.BuyAndHold._2 import BH
from DataClasses import Parameter
from Calculator import Calculator

test = BH()
test.set_parameter([
        Parameter("product", "cat", 'TXF'),
        Parameter("long/short", "cat", 'long'),
        Parameter("Days to maturity", "num", 0),
        ])
test.set_product_date(start_date="2004-01-01", end_date="2100-01-01")
ta = test.run()
cal = Calculator()
cal.set_slip(1)

tr = cal.calculate(ta)
ts = cal.get_all_statistics(tr)
for i in ts:
    print(i)
