import pymongo
import os
from Xgkabaap import Ultimate_out
import csv
import random

dir = 'ProductsCleanDatasets'

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["JitFab"]
products = db["Products"]

n, p = 0, 0
header = ['Business Unit','Product Family','PLID','Fiscal Quarter','Fiscal Month','Booked_Qty','Booking_Date']
for file in os.scandir(dir):
	if file.is_file():
		res = Ultimate_out(file.name)
		if res == "Sorry too low on **ata":
			n += 1
			continue
		else:
			csvfile = open(dir+'/'+file.name, 'r')
			p += 1
			reader = csv.DictReader( csvfile )
			first = True
			row = {}
			for each in reader:
				if first:
					for field in header[:3]:
						row[field] = each[field]
					for field in header[4:]:
						row[field] = [each[field]]
					first = False
					# products.insert_one(row)
				else:
					for field in header[4:]:
						row[field].append(each[field])
			row["pred"] = [random.randint(1, 100) for _ in range(4)]
			products.insert_one(row)
			# print(row)
				
print(n, p)
