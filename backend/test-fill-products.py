import random
import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["JitFab"]
products = db["Products"]

def insertRandomProducts(n=20, ran=(12, 4)):
	for _ in range(n):
		d = {
			"PLID": ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=5)),
			"data": [random.randint(1, 10) for _ in range(ran[0])],
			"pred": [random.randint(1, 10) for _ in range(ran[1])]
		}
		products.insert_one(d)

def insertPredValsForLstm():
	l = products.find({})
	for i in l:
		d = i
		d = [random.randint(1, 10) for _ in 4]



def clearProducts():
	products.delete_many({})


clearProducts()