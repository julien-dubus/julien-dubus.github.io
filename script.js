// Initialize markers array

var formID = "1FAIpQLSem_9tSoQNv_OKkDIAjmCAYctFxjrupPbed5LQ830AO6RRxyw"
var formlatID = "702141779"
var formlngID = "933478607"
var formtypeID = "204126937"
var formdateID = "559537287"
var formdescriptionID = "1426942264"

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxZqyHH7C4M_LySMtWv4Roa-snTqvFwFz88BRA_1a2Zw1ELV9RAewRB23NR5ZR0FlaIU2teaNL1L4C/pub?output=csv';

var markers = [];


const map = L.map('map').setView([63.42, 10.43], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; OpenStreetMap contributors',
	maxZoom: 19
}).addTo(map);



// function init() {
	// Papa.parse(public_spreadsheet_url, {
		// download: true,
		// header: true,
		// complete: showInfo
	// })
  // }
  
// window.addEventListener('DOMContentLoaded', init)
  
// function showInfo(results) {
	// var data = results.data

	// // data comes through as a simple array since simpleSheet is turned on
	// console.log(data);
// }

data = [{Horodateur: "03/05/2023 13:13:34", "Latitude (do not change)": "63.42965161893003", "Longitude (do not change)": "10.392208099365236", "Closing date": "1789", "Store type": "specialised: patate" }];

function displayAllData (data) {
	// Extract data from object
	for (d of data) {
		const lat = parseFloat(d["Latitude (do not change)"]);
		const lng = parseFloat(d["Longitude (do not change)"]);
		const closingDate = d["Closing date"];
		const storeType = d["Store type"];

		// Create marker and set its position
		const marker = L.marker([lat, lng]);

		// Set marker title and description
		marker.bindPopup("<b>Closing Date:</b> " + closingDate + "<br><b>Store Type:</b> " + storeType);

		// Add marker to the map
		marker.addTo(map);
	}
}

// Add new markers to the map and open google form
function onMapClick(e) {
	lat = e.latlng.lat;
	lng = e.latlng.lng;
	// var popup = document.getElementById("formdiv").innerHTML;
	var popup = L.popup({content:'<div id="formdiv"><div class="form-group"><div class="form-group"><label for="storeType">What kind of store was it ?<br></label><label class="form-radio"><input type="radio" id="supermarket" name="storeType" value="supermarket" checked="checked" onclick="UpdateSpecialised(true)"></input>Supermarket<br></label><label class="form-radio"><input type="radio" id="kiosk" name="storeType" value="kiosk" onclick="UpdateSpecialised(true)"></input>Kiosk<br></label><label class="form-radio"><input type="radio" id="specialised" name="storeType" value="specialised" onclick="UpdateSpecialised(false)"></input>Specialised : <input type="text" name="storeType" placeholder="type of products sold" id="specialisedInput" disabled="true"/> <br><br></label><label for="date">In what year did this store close ?</label><textarea class="form-control" name="dateInput" id="dateInput" placeholder="(optionnal)"></textarea>			<label for="description">Short description of the store</label><textarea class="form-control" name="descriptionInput" id="descriptionInput" placeholder="(optionnal)"></textarea>			</div><em class="text-muted">Click submit to add a store at this location.</em><div id="formHelp"></div><hr /><button type="button" id="SubmitButton" onclick="OpenForm();">Submit</button></div></div>', closeButton:true});
    
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
			};
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
	
	let description = document.querySelector('#descriptionInput').value;
	
	var link = "https://docs.google.com/forms/d/e/" + formID + "/viewform?usp=pp_url&entry." + formlatID + "=" + lat + "&entry." + formlngID + "=" + lng + "&entry." + formdateID + "=" + date + "&entry." + formtypeID + "=" + type + "&entry." + formdescriptionID + "=" + description + "&submit=Submit";
	window.open(link);
	
	markers.push(marker);
}

function UpdateSpecialised(disabled) {
	document.getElementById("specialisedInput").disabled = disabled;
	if (disabled) {
		document.getElementById("specialisedInput").value = "";
	};
};


displayAllData(data);

map.on('click', onMapClick);
