import pymongo
from bson import json_util, ObjectId
import datetime;

to_json = lambda raw:json_util.dumps(raw)
# ct stores current time
ct = datetime.datetime.now()
print("current time:-", ct)
 
# ts store timestamp of current time
ts = ct.timestamp()
print("timestamp:-", ts)

get_timestamp = lambda : datetime.datetime.now().timestamp()

myclient = pymongo.MongoClient("mongodb://localhost:27017/")    
lists_db = myclient["lists"]
list_group_collection = lists_db["listGroups"]

class ListGroupController: 
    def __init__(self, req):
            self.request = req.copy()
    
    def getListGroupByUserId(self):
          print('userId ',self.request['userId'])
          user_id = self.request['userId']
          lg = list_group_collection.find({'users': {'$in': [user_id]}})
          all_list_json = to_json(lg) 
          print('Alllist ',all_list_json)
          return all_list_json
