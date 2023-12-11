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
users_collection = lists_db["users"]
list_groups_collection = lists_db["listGroups"]


class UsersController:
    def __init__(self, req):
        print('Hello from List controller', req)
        self.request = req.copy()

    def createUsers(self):
        new_user = {}
        new_user['time'] = get_timestamp()
        new_user['name'] = self.request['name']
        new_user['active'] = True
        result = users_collection.insert_one(new_user)
        new_user_id = str(result.inserted_id)
        # print('--->> new User result ', str(result.inserted_id))
        new_lg_id = ''

        # If it has false `createListgroup` as true then create listGroup
        if 'createListGroup' in self.request and self.request['createListGroup']:
            print('inside createListgroup false')
            result1 = list_groups_collection.insert_one({
                "users": [new_user_id],
                "created": {
                    "time": get_timestamp(),
                    "userId": new_user_id,
                },
                "title": "List Group",
                "desc": "Contains a group of shopping list"
            })
            print('result1 ', result1)
            new_lg_id = str(result1.inserted_id)
            print('result1 json', new_lg_id)
        response = {'userId': new_user_id, 'newListGroupId': new_lg_id}


        if 'listGroupId' in self.request and self.request['listGroupId']:
            print('listGroupId is -->> ', self.request['listGroupId'])
            query = {"_id": ObjectId(self.request['listGroupId'])}
            result = list_groups_collection.find(query)
            print(' --->>> ', to_json(result))
            result = list_groups_collection.find_one_and_update(query, {
                "$push": {"users": new_user_id}
            })
            print('New user pushed inside existing listgroup', result)
        # return to_json({'userId': str(result.inserted_id)}), 200
        return to_json(response)
