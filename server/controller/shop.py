import pymongo
import datetime;
from bson import json_util, ObjectId
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")    
lists_db = myclient["lists"]
shop_collection = lists_db["shop"]

get_timestamp = lambda : datetime.datetime.now().timestamp()
to_json = lambda raw:json_util.dumps(raw)

class ShoppingListController():
    def __init__(self, req):
        print('Hello from List controller',req)
        self.request = req


    def set_shop_item(self): 
        request = self.request
        shopping_list_detail = json.loads(self.request.form.get('document'))
        print('shopping list', shopping_list_detail)
        if 'file_attachment' in request.files:
            uploaded_file = request.files['file_attachment']
            filename = uploaded_file.filename[0]
            file_data = uploaded_file.read()
        else:
            filename=None
            file_data=None
        imgfile=dict()
        imgfile['filename']= filename,
        imgfile['file_data']= file_data
        shopping_list_detail['time'] = get_timestamp()
        shopping_list_detail['file'] = imgfile
        shop_collection.insert_one(shopping_list_detail)
        # return to_json(self.request)