# Trading Platform
- This is a web application that deliver as the final project for a course taken in CSIE, NTU named Software Engineering.
- The goal of this project is to build a platform where user can test and show the performance of their trading algorithm.
- This is a 6 man project
- We use Flask as backend framework and React.js as frontend framework
## How to run
- run backend server
	- for linux, replace set to export
```shell
$ cd PATH/TO/backend
$ pip install -r requirements.txt
$ set FLASK_APP=main.py
$ python -m flask run --reload --port=5000
```
- run frontend server
```shell
$ cd PATH/TO/frontend
$ npm install
$ npm start
```
## Demo
- Please refer to this [vedio](https://drive.google.com/file/d/1jKkP6lMltL-uGcDwWg5gQHGnt8dqaBqR/view?usp=sharing) about how to use the platform.
	- First, see the function present in 3:45 to upload a algo.
	- You can find two sample algorithms(_2.py, first_version.py) in backend/algo_example/BuyAndHold
	- The algo. is written in python
