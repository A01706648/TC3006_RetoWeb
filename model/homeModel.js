const https = require('https');
const http=require('http')

class homeClass
{
    constructor()
    {
        
    }

    static predict(obj)
    {
        let path = `/?date1=${obj['date']}`

        https.get(path,(res) => {
          let body = "";
      
          res.on("data", (chunk) => {
              body += chunk;
          });
      
          res.on("end", () => {
              try {
                  let json = JSON.parse(body);
                  // do something with JSON
                  return json;
              } catch (error) {
                  console.error(error.message);
              };
          });
      
      }).on("error", (error) => {
          console.error(error.message);
      });
    }
}

module.exports = homeClass;