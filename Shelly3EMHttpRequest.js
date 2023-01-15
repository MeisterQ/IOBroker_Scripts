//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Skript zum Abfragen des Status von einem Shelly 3EM um Energie / Leistungsdaten im 5-Sekunden-Takt zu erhalten
// Version 1.0
// Author Andreas Podlich 
// 22.06.2021
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var URL = 'http://192.168.10.12';               // Hier IP von Shelly 3EM Eintragen
var request = 5;                                // Hier Poll-Zeit in Sekunden eingeben


var L1
var L2
var L3
var total
var Data = "javascript.0.Leistung.System.data";


schedule("*/" + request + " * * * * *", async function () {
        createState("Leistung.L1");
        createState("Leistung.L2");
        createState("Leistung.L3");
        createState("Leistung.total");
        createState("Leistung.System.data")


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
  
  setState('javascript.0.Leistung.L1', (L1));
  setState('javascript.0.Leistung.L2', (L2));
  setState('javascript.0.Leistung.L3', (L3));
  setState('javascript.0.Leistung.total', (total.toFixed(2)));
   
});