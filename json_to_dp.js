//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This Script parse data from json into datapoint. 
// Version 1.0
// Created by Andreas Podlich 
// 16.01.2023
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var sourceJson = 'mqtt.0.smarthome.tele.3dDrucker.SENSOR' // Enter your datapoint location with json here
var datapoint1	// This is your temporary variable. Copy it if you need more datapoints		
// var datapoint2	// This is your temporary variable. Copy it if you need more datapoints															
var newdatapoint = "jsondatapoint1"		// Name of the new datapoint
//var newdatapoint2 = "jsondatapoint2"		// Name of the new datapoint

on({id: sourceJson, change: "any"}, function (obj) {
	    createState(newdatapoint); // Create datapoint. Adjust name and add more lines with more datapoints if needed

   try {obj = JSON.parse(getState(sourceJson).val);
   } catch (e) {
           console.error('Cannot parse: ' + getState(sourceJson).val);
           return;
    }
   
  datapoint1 = obj.jsondatalocation;
//  datapoint2 = obj.jsondatalocation2;
  setState('javascript.0.' + newdatapoint, (datapoint1));	// Copy this line to set more states
// setState('javascript.0.' + newdatapoint2, (datapoint2));
});