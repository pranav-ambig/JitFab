from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import pymongo
import json

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["JitFab"]
inventories = client["Inventories"]
products = db["Products"]

@app.route('/prod', methods=['GET', 'POST'])
def getProducts():
	d = json.loads(request.data)
	# print(d)
	# return "hi"
	res = products.find_one(d)
	# print(res)
	# return "kasdfk"
	if res == None:
		return "Error"
	else:
		return [res["PLID"], res["data"], res["pred"]]
