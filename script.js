// Initialize markers array

var formID = "1FAIpQLSem_9tSoQNv_OKkDIAjmCAYctFxjrupPbed5LQ830AO6RRxyw"
var formlatID = "702141779"
var formlngID = "933478607"
var formtypeID = "204126937"
var formdateID = "559537287"

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxZqyHH7C4M_LySMtWv4Roa-snTqvFwFz88BRA_1a2Zw1ELV9RAewRB23NR5ZR0FlaIU2teaNL1L4C/pub?output=csv';

var markers = [];


const map = L.map('map').setView([63.42, 10.43], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; OpenStreetMap contributors',
	maxZoom: 19
}).addTo(map);




function init() {
	Papa.parse(public_spreadsheet_url, {
		download: true,
		header: true,
		complete: showInfo
	})
  }
  
window.addEventListener('DOMContentLoaded', init)
  
function showInfo(results) {
	var data = results.data

	// data comes through as a simple array since simpleSheet is turned on
	alert("Successfully processed " + data.length + " rows!")
	document.getElementById("food").innerHTML = "<strong>Foods:</strong> " + [ data[0].Name, data[1].Name, data[2].Name ].join(", ");
	console.log(data);
}
	  
	  

// Add new markers to the map and open google form
function onMapClick(e) {
	lat = e.latlng.lat;
	lng = e.latlng.lng;
	// var popup = document.getElementById("formdiv").innerHTML;
	var popup = L.popup({content:'<div id="formdiv"><div class="form-group"><div class="form-group"><label for="storeType">What kind of store was it ?<br></label><label class="form-radio"><input type="radio" id="supermarket" name="storeType" value="supermarket" checked="checked" onclick="UpdateSpecialised(true)"></input>Supermarket<br></label><label class="form-radio"><input type="radio" id="kiosk" name="storeType" value="kiosk" onclick="UpdateSpecialised(true)"></input>Kiosk<br></label><label class="form-radio"><input type="radio" id="specialised" name="storeType" value="specialised" onclick="UpdateSpecialised(false)"></input>Specialised : <input type="text" name="storeType" placeholder="type of products sold" id="specialisedInput" disabled="true"/> <br><br></label><label for="date">In what year did this store close ?</label><textarea class="form-control" name="dateInput" id="dateInput" placeholder="(optionnal)"></textarea></div><em class="text-muted">Click submit to add a store at this location.</em><div id="formHelp"></div><hr /><button type="button" id="SubmitButton" onclick="OpenForm();">Submit</button></div></div>', closeButton:true});
    
	//Add marker visually on the map and open a popup
	marker = L.marker(e.latlng).addTo(map).bindPopup(popup);
	

    setTimeout(function() {
		marker.openPopup();
    }, 100);
	
	// Remove the marker when the popup is closed
	marker.on('popupclose', function() {
		map.removeLayer(marker);
		setTimeout(function() {
			for (m of markers) {	
				m.addTo(map);
			}
		},0);
	});
};


function OpenForm() {
	let date = document.querySelector('#dateInput').value;
	if (date == "") {
		date = "unknow";
	};
	
	let type = document.querySelector('input[name="storeType"]:checked').value;	
	if (type == "specialised") {
		type = type + ": " + document.getElementById("specialisedInput").value;
	};
	
	var link = "https://docs.google.com/forms/d/e/" + formID + "/viewform?usp=pp_url&entry." + formlatID + "=" + lat + "&entry." + formlngID + "=" + lng + "&entry." + formdateID + "=" + date + "&entry." + formtypeID + "=" + type + "&submit=Submit"
	window.open(link)
	
	markers.push(marker);
}

function UpdateSpecialised(disabled) {
	document.getElementById("specialisedInput").disabled = disabled;
	if (disabled) {
		document.getElementById("specialisedInput").value = "";
	}
}


https://docs.google.com/spreadsheets/d/1nR7_Jpn0Q26iEbOmoU-OxJLxwl4sQ7KZdVjTMb4KSC8/edit?usp=sharing

map.on('click', onMapClick);
