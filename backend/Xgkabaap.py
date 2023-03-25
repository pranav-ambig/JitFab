# import os,XGboost_forecast,pickle
# # assign directory
# directory = 'ProductsDatasets'
 
# # iterate over files in
# # that directory
# trained_models=dict()
# for filename in os.listdir(directory):
#     f = os.path.join(directory, filename)
#     # checking if it is a file
#     if os.path.isfile(f):
#         print(f)
#         try:
#             recieved  =   XGboost_forecast.setdsetandload(filename)
#             trained_models[filename] = recieved
#         except XGboost_forecast.TooFewDataPointError:
#             print("Too few datapoints in ",filename,"skipping...")
#             continue
#         # print ( XGboost_forecast.Ultimate_out())
        

# print(trained_models)

# def Ultimate_out( datasetname ,tempout = [[21432,39989],[23162,46255]]):
    
#     if datasetname in trained_models:
#         return trained_models[datasetname].predict(tempout)
#     else:
#         return "Sorry too low on **ata"
        

# print(len(trained_models))
# with open("modelarray.pkl" , "wb")as f :
#     pickle.dump(trained_models,f)
# # print ( Ultimate_out("A9K-RSP880-TR.csv"))
        

# production mode

import pickle

with open("modelarray.pkl","rb") as f:
    trained_models = pickle.load(f)

def Ultimate_out( datasetname ,tempout = [[21432,39989],[23162,46255]]):
    
    if datasetname in trained_models:
        return trained_models[datasetname].predict(tempout)
    else:
        return "Sorry too low on **ata"
    
print ( Ultimate_out("WS-C3650-48FQM.csv") )