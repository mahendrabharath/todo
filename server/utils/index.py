from bson import json_util, ObjectId

to_json = lambda raw:json_util.dumps(raw)   