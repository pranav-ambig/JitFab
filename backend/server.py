from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import pymongo
import json
from Xgkabaap import Ultimate_out
import pickle

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["JitFab"]
inventories = client["Inventories"]
products = db["Products"]

@app.route('/lstm', methods=['GET', 'POST'])
def getProducts():
	d = json.loads(request.data)
	res = products.find_one(d)
	if res == None:
		return "Error"
	else:
		return [res["PLID"], res["Booked_Qty"][-12:], res["pred"]]

@app.route('/xgb', methods=['GET', 'POST'])
def getProductsXG():
	d = json.loads(request.data)
	res = products.find_one(d)
	out = Ultimate_out(d["PLID"]+".csv")
	out =  list(map(int, out[0]))
	# print([res['PLID'], res['Booked_Qty'][-12:], json.loads(out[:4])])
	# return out[:4]
	return [res['PLID'], res['Booked_Qty'][-12:], out[:4]]
