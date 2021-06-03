data='{"algo_id": 0, "product": {"start_date": "2007-02-15", "end_date": "2007-04-04", "slip": 2.5}, "parameter": [{"name": "long/short", "type": "cat", "value": "long"}]}'

curl -X POST -H "Content-Type: application/json" \
    -d "$data"\
    http://127.0.0.1:5000/single-test
