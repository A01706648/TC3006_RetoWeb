from joblib import dump, load
from statsmodels.tsa.deterministic import CalendarFourier, DeterministicProcess
from sklearn.linear_model import LinearRegression
import pandas as pd

model_save = load('model_reto.joblib')
dp_save = load('dp_reto.joblib')
y_columns_save = load('y_columns.joblib')

family_list = ['AUTOMOTIVE'
 ,'BABY CARE'
 ,'BEAUTY'
 ,'BEVERAGES'
 ,'BOOKS'
 ,'BREAD/BAKERY'
 ,'CELEBRATION'
 ,'CLEANING'
 ,'DAIRY'
 ,'DELI'
 ,'EGGS'
 ,'FROZEN FOODS'
 ,'GROCERY I'
 ,'GROCERY II'
 ,'HARDWARE'
 ,'HOME AND KITCHEN I'
 ,'HOME AND KITCHEN II'
 ,'HOME APPLIANCES'
 ,'HOME CARE'
 ,'LADIESWEAR'
 ,'LAWN AND GARDEN'
 ,'LINGERIE'
 ,'LIQUOR,WINE,BEER'
 ,'MAGAZINES'
 ,'MEATS'
 ,'PERSONAL CARE'
 ,'PET SUPPLIES'
 ,'PLAYERS AND ELECTRONICS'
 ,'POULTRY'
 ,'PREPARED FOODS'
 ,'PRODUCE'
 ,'SCHOOL AND OFFICE SUPPLIES'
 ,'SEAFOOD'
]

input_date = '2015-7-12'
input_store_nbr = '1'
input_family = {
'AUTOMOTIVE':0
 ,'BABY CARE':0
 ,'BEAUTY':0
 ,'BEVERAGES':0
 ,'BOOKS':0
 ,'BREAD/BAKERY':0
 ,'CELEBRATION':0
 ,'CLEANING':0
 ,'DAIRY':0
 ,'DELI':0
 ,'EGGS':0
 ,'FROZEN FOODS':0
 ,'GROCERY I':0
 ,'GROCERY II':0
 ,'HARDWARE':0
 ,'HOME AND KITCHEN I':0
 ,'HOME AND KITCHEN II':0
 ,'HOME APPLIANCES':0
 ,'HOME CARE':0
 ,'LADIESWEAR':0
 ,'LAWN AND GARDEN':0
 ,'LINGERIE':0
 ,'LIQUOR,WINE,BEER':0
 ,'MAGAZINES':0
 ,'MEATS':0
 ,'PERSONAL CARE':0
 ,'PET SUPPLIES':0
 ,'PLAYERS AND ELECTRONICS':0
 ,'POULTRY':0
 ,'PREPARED FOODS':0
 ,'PRODUCE':0
 ,'SCHOOL AND OFFICE SUPPLIES':0
 ,'SEAFOOD':0
}
input_onpromotion = '10'

data_date = []
data_store_nbr = []
data_family = []
data_onpromotion = []

family_key = list(input_family.keys())
#prepare the input data
for family in family_key:
    data_date.append(input_date)
    data_store_nbr.append(input_store_nbr)
    data_onpromotion.append(input_family[family])

data_family = family_key


data = list(zip(data_date, data_store_nbr, data_family, data_onpromotion))
df_test = pd.DataFrame(data, columns = ['date', 'store_nbr', 'family', 'onpromotion'])

#transfer the input data
df_test["date"]
df_test['date'] = pd.to_datetime(df_test['date'])
df_test["date"] = df_test["date"].dt.to_period("D")
df_test = df_test.set_index(["store_nbr", "family", "date"]).sort_index()
X_test = dp_save.out_of_sample(steps=16)
X_test.index.name = "date"
X_test["NewYear"] = (X_test.index.dayofyear == 1)

#predict
#y_predict = model_save.predict(X_test)
#print(y_predict)
y_submit_save = pd.DataFrame(model_save.predict(X_test), index=X_test.index, columns=y_columns_save)
y_submit_save = y_submit_save.stack(["store_nbr", "family"])
y_submit_save = y_submit_save.reindex(columns=["sales"])
print(y_submit_save.head(len(family_key)))