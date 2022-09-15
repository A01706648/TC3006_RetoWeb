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


def predict(date_str):
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
    #print(y_submit_save.head(len(family_key)))

    return y_submit_save['sales'].sum()

def getSale(date_str):
    pd_train = pd.read_csv('train.csv')
    pd_train = pd_train[pd_train['date'] == date_str]
    return pd_train['sale'].sum()


from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import cgi

def some_function():
    print("some_function got called")

class MyHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    # GET sends back a Hello world message
    def do_GET(self):
        #if self.path == '/captureImage':
            # Insert your code here
        #    some_function()
        print(self.path)
        
        date_str = (self.path.split('='))[1]
        sale = predict(date_str)

        self._set_headers()

        result = 'Wrong'

        sale_real = getSale(date_str)

        if(abs(sale_real - sale) / sale_real < 0.1):
            result = 'True'

        self.wfile.write(json.dumps({'sale': sale, 'Result':, 'received': 'ok'}))

    # POST echoes the message adding a JSON field
    def do_POST(self):
        ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
        
        # refuse to receive non-json content
        if ctype != 'application/json':
            self.send_response(400)
            self.end_headers()
            return
            
        # read the message and convert it into a python dictionary
        length = int(self.headers.getheader('content-length'))
        message = json.loads(self.rfile.read(length))
        
        # add a property to the object, just to mess with data
        message['received'] = 'ok'
        
        # send the message back
        self._set_headers()
        self.wfile.write(json.dumps(message))

hostName = "localhost"
serverPort = 443

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyHandler)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")