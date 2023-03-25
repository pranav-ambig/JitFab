import random
import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["JitFab"]
inventories = db["Inventories"]

def insertRandomInventories(n=10, capRange=(10, 100)):
	l = []
	for i in range(n):
		d = {
			"capacity": random.randint(*capRange)
		}
		l.append(d)
	inventories.insert_many(l)

def clearInventories():
	inventories.delete_many({})


