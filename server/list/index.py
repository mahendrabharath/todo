from flask import Flask, jsonify, request
import pymongo
from bson import json_util
import json
app = Flask(__name__)
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]



@app.route("/")
def hello_world():
    return "Hello, Web!"

@app.route('/list', methods = ['GET', 'POST'])
def list_todo():
    lists_db = myclient["lists"]
    todo_collection = lists_db["todo"]
    if request.method == 'GET':
        allList = todo_collection.find()
        return jsonify(json_util.dumps(allList)), 200
    if request.method == 'POST':
        print(request.get_json())
        todo_collection.insert_one(request.get_json())
        return jsonify(json_util.dumps(request.get_json())), 200

