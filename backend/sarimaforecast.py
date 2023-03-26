
# import numpy as np # linear algebra
# import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
# from statsmodels.tsa.stattools import adfuller
# from pandas.plotting import autocorrelation_plot
# from statsmodels.graphics.tsaplots import plot_acf,plot_pacf
# import statsmodels.api as sm
# from statsmodels.tsa.arima.model import ARIMA

# # Input data files are available in the read-only "../input/" directory
# # For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

# def setdsetandload(datasetused):

#     global trained_model
#     df=pd.read_csv("ProductsCleanDatasets/"+datasetused)
#     df['Booking_Date']=pd.to_datetime(df['Booking_Date'],format='%d-%m-%Y')
#     # df.head()
#     df.set_index('Booking_Date',inplace=True)
#     test_result=adfuller(df['Booked_Qty'])
#     def adfuller_test(sales):
#         result=adfuller(sales)
#         labels = ['ADF Test Statistic','p-value','#Lags Used','Number of Observations Used']
#         for value,label in zip(result,labels):
#             print(label+' : '+str(value) )
#         if result[1] <= 0.05:
#             print("strong evidence against the null hypothesis(Ho), reject the null hypothesis. Data has no unit root and is stationary")
#         else:
#             print("weak evidence against null hypothesis, time series has a unit root, indicating it is non-stationary ")
        
#     adfuller_test(df['Booked_Qty'])
#     df['Booked_Qty First Difference'] = df['Booked_Qty'] - df['Booked_Qty'].shift(1)
#     df['Booked_Qty'].shift(1)
#     df['Seasonal First Difference']=df['Booked_Qty']-df['Booked_Qty'].shift(12)
#     adfuller_test(df['Seasonal First Difference'].dropna())
#     df['Seasonal First Difference'].plot()
    
#     autocorrelation_plot(df['Booked_Qty'])
#     # plt.show()
#     # model=ARIMA(df['Booked_Qty'],order=(1,1,2))
#     # model_fit=model.fit()
#     # model_fit.summary()
#     # df['Booked_Qty forecast']=model_fit.predict(start=90,end=103,dynamic=True)
#     # df[['Booked_Qty','Booked_Qty forecast']].plot(figsize=(12,8))
#     model=sm.tsa.statespace.SARIMAX(df['Booked_Qty'],order=(1, 1, 2),seasonal_order=(1,1,2,12))
#     results=model.fit()
#     df['Booked_Qty forecast']=results.predict(start=90,end=103,dynamic=True)
#     df[['Booked_Qty','Booked_Qty forecast']].plot(figsize=(12,8))
#     from pandas.tseries.offsets import DateOffset
#     future_dates=[df.index[-1]+ DateOffset(months=x)for x in range(0,24)]
#     future_datest_df=pd.DataFrame(index=future_dates[1:],columns=['Booked_Qty','Booked_Qty forecast'])
#     future_df=pd.concat([df,future_datest_df])
#     print(len(df))
#     future_df['Booked_Qty forecast'] = results.predict(start = len(df)-1, end = 144, dynamic= True)  
# # future_df[['Booked_Qty', 'Booked_Qty forecast']].plot(figsize=(12, 8)) 
#     results.save("Sarima/"+datasetused+".pickle")
    
# import os
# # assign directory
# directory = 'ProductsCleanDatasets'
 
# # iterate over files in
# # that directory
# trained_models=dict()
# for filename in os.listdir(directory):
#     f = os.path.join(directory, filename)
#     # checking if it is a file
#     if os.path.isfile(f):
#         print(f)
#         try:
#             setdsetandload(filename)
#         except:
#             continue
#         # trained_models[filename] = recieved
       
        

# setdsetandload("A9K-8X100GE-TR")

# production



import statsmodels.api as sm , pandas as pd



def Ultimate_out( datasetname ):
    new_results = sm.load("Sarima/"+datasetname+'.pickle')
    # future_df = pd.DataFrame()
    df=pd.read_csv("ProductsCleanDatasets/"+datasetname)
    futurearr  = new_results.predict(start = len(df)-1, end = len(df) + 10, dynamic= True)  
    # print(futurearr.tolist())
    return futurearr.tolist()
    
    
# print ( Ultimate_out("A9K-8X100GE-TR.csv") )