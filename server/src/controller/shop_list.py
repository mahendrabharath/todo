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
        print('shopping list', shopping_list_detail,request.form.get('file_type'))
        file_type = request.form.get('file_type')
        if file_type == 'BLOB':
            if 'file_attachment' in request.files:
                uploaded_file = request.files['file_attachment']
                filename = uploaded_file.filename[0]
                file_data = uploaded_file.read()
        else:
            filename='img'
            file_data=self.request.form.get('file_url')
        imgfile=dict()
        imgfile['filename']= filename,
        imgfile['file_data']= file_data
        imgfile['file_type']= file_type
        shopping_list_detail['time'] = get_timestamp()
        shopping_list_detail['file'] = imgfile
        shopping_list_detail['bought'] = False
        shop_collection.insert_one(shopping_list_detail)
        # return to_json(self.request)

    def getAllLists(self):
        all_list = shop_collection.find()
        print('Alllist ',all_list)
        all_list_json = to_json(all_list) 
        return all_list_json
    
    def updateShopItem(self):
        req = self.request.copy()
        req['time'] = get_timestamp()
        taskId = ObjectId(req['id'])
        query={'_id': taskId}
        req.pop('id')
        print('Update --> ', req, query )
        result = shop_collection.find_one_and_update(query, {'$set':req})
        print('edit result ',result)
        newRecord = shop_collection.find_one(query)
        print('New record is ', newRecord, taskId)
        return to_json(newRecord), 200