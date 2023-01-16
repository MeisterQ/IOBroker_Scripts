//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This Script polls energy data from Shelly 3EM via HTTP-Request and create datapoints in first run in your javascript folder
// Version 1.0
// Created Andreas Podlich 
// 22.06.2021
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var URL = 'http://192.168.10.12';               // Put in IP from Shelly 3EM
var request = 5;                                // Polltime (Seconds)


var L1
var L2
var L3
var total
var Data = "javascript.0.Leistung.System.data";


schedule("*/" + request + " * * * * *", async function () {
        createState("Shelly3EM.L1");
        createState("Shelly3EM.L2");
        createState("Shelly3EM.L3");
        createState("Shelly3EM.total");
        createState("Shelly3EM.System.data")


  try {                 
    require("request")(URL + "/status", async function (error, response, result) {
      setState(Data, result);
    }).on("error", function (e) {console.error(e);});
  } catch (e) { console.error(e); }


   try {obj = JSON.parse(getState(Data).val); 
   } catch (e) {
           console.error('Cannot parse: ' + getState(Data).val); // 
           return;
    }
   
    L1 = obj.emeters[0].power;
    L2 = obj.emeters[1].power;
    L3 = obj.emeters[2].power;
    total = L1 + L2 + L3;
  
  setState('javascript.0.Shelly3EM.L1', (L1));
  setState('javascript.0.Shelly3EM.L2', (L2));
  setState('javascript.0.Shelly3EM.L3', (L3));
  setState('javascript.0.Shelly3EM.total', (total.toFixed(2)));
   
});