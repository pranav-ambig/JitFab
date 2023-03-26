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
inventories = db["Inventories"]
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
	bk = list(map(int, res["Booked_Qty"]))
	out = Ultimate_out(d["PLID"]+".csv")
	if out == "Sorry too low on **ata":
		return "Error"
	
	out = Ultimate_out(d["PLID"]+".csv", [[bk[-4],bk[-3]], [bk[-2], bk[-1]]])
	out =  list(map(int, out[0]))
	return [res['PLID'], res['Booked_Qty'][-12:], out[:4]]

@app.route('/xgbrt', methods=['GET', 'POST'])
def getProductsXGBRT():
	d = json.loads(request.data)
	
	# print("teeeeeeest", d)
	if d["point"]:
		d2 = {"PLID":d["PLID"]}
		idk = int(d["point"])
		res = products.find_one(d2)
		if res:
			bk = list(map(int, res["Booked_Qty"]))
			out = Ultimate_out(d["PLID"]+".csv")
			if out == "Sorry too low on **ata":
				print("ld err")
				return "Error"
		
			out = Ultimate_out(d["PLID"]+".csv", [[bk[-4]+idk,bk[-3]], [bk[-2], bk[-1]]])
			out =  list(map(int, out[0]))
			print([res['PLID'], res['Booked_Qty'][-12:], out[:4]])
			return [res['PLID'], res['Booked_Qty'][-12:], out[:4]]
		else:
			print("res err", res)
			return "Error"
	else:
		print("d err")
		return "Error"

@app.route('/invent', methods=['GET', 'POST'])
def invent():
	d = json.loads(request.data)
	l = inventories.find({})
	out = []
	c = 0
	for i in l:
		if c == d["num"]:
			break
		out.append(i[d["PLID"]])
		c += 1
	print([{"quan":out}])
	return [{"quan":out}]
