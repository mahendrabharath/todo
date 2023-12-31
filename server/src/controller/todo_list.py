import pymongo
from bson import json_util, ObjectId
import datetime


def to_json(raw): return json_util.dumps(raw)


# ct stores current time
ct = datetime.datetime.now()
print("current time:-", ct)

# ts store timestamp of current time
ts = ct.timestamp()
print("timestamp:-", ts)


def get_timestamp(): return datetime.datetime.now().timestamp()


myclient = pymongo.MongoClient("mongodb://localhost:27017/")
lists_db = myclient["lists"]
todo_collection = lists_db["todo"]


class ListController:
    def __init__(self, req):
        print('Hello from List controller', req)
        self.request = req.copy()

    def getAllLists(self):
        all_list = todo_collection.find()
        print('Alllist ', all_list)
        all_list_json = to_json(all_list)
        return all_list_json

    def addToDoList(self):
        self.request
        print('New List is -->> ', self.request)
        new_todo = self.request.copy()
        new_todo['time'] = get_timestamp()
        new_todo_id = todo_collection.insert_one(new_todo)

        return to_json(self.request)

    def updateTodoItem(self):
        req = self.request.copy()
        req['time'] = get_timestamp()
        taskId = ObjectId(req['id'])
        query = {'_id': taskId}
        req.pop('id')
        print('Update --> ', req, query)
        result = todo_collection.find_one_and_update(query, {'$set': req})
        print('edit result ', result)
        newRecord = todo_collection.find_one(query)
        print('New record is ', newRecord, taskId)
        return to_json(newRecord), 200

    def getListByGroupId(self, listGroupId):
        print('getListByGroupId', listGroupId)
        query = {'listGroupId': listGroupId}
        result = todo_collection.find(query)
        print('Alllist ', result)
        all_list_json = to_json(result)
        print('all_list_json ', all_list_json)
        return all_list_json
        #  listGroupId = self.request
