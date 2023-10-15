import pathlib
import sys
projectDir = str(pathlib.Path().parent.resolve())
print('Path to program ', projectDir)
sys.path.insert(0, projectDir+'\controller')

from shop_list import ShoppingListController
from todo_list import ListController
from flask import Flask, request
from flask_cors import CORS, cross_origin
import pymongo
from bson import json_util



def to_json(raw): return json_util.dumps(raw)


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
lists_db = myclient["lists"]
todo_collection = lists_db["todo"]

# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/")
@cross_origin()
def hello_world():
    return "Hello, Web!"


@app.route('/list', methods=['GET', 'POST', 'PATCH'])
@cross_origin()
def list_todo():
    if request.method == 'GET':
        list_controller = ListController({})
        allList = list_controller.getAllLists()
        return allList, 200
    # ----- End of GET method -----
    if request.method == 'POST':
        list_controller = ListController(request.get_json())
        postList = list_controller.addToDoList()
        print(request.get_json())
        return postList, 200
    # #----- End of POST method -----
    if request.method == 'PATCH':
        list_controller = ListController(request.get_json())
        newRecord = list_controller.updateTodoItem()
        return newRecord
    # #----- End of PATCH method -----


@app.route('/shop', methods=['GET', 'POST', 'PATCH'])
@cross_origin()
def list_shop():
    if request.method == 'GET':
        list_controller = ShoppingListController({})
        allList = list_controller.getAllLists()
        return allList, 200
    # ----- End of GET method -----
    if request.method == 'POST':
        shop_controller = ShoppingListController(request)
        shop_controller.set_shop_item()
        return ['test'], 200
    # ----- End of POST method -----
    if request.method == 'PATCH':
        print('--->> ',request.get_json())
        list_controller = ShoppingListController(request.get_json())
        newRecord = list_controller.updateShopItem()
        return newRecord
    # #----- End of PATCH method -----   
