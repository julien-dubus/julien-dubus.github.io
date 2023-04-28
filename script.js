// Initialize markers array

var formID = "1FAIpQLSem_9tSoQNv_OKkDIAjmCAYctFxjrupPbed5LQ830AO6RRxyw"
var formlatID = "702141779"
var formlngID = "933478607"
var formdateID = "559537287"

var map = L.map('map').setView([63.42, 10.43], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; OpenStreetMap contributors',
	maxZoom: 18
}).addTo(map);


// Add new markers to the map and open google form
function onMapClick(e) {
	lat = e.latlng.lat;
	lng = e.latlng.lng;
	var form = '<div id="formdiv"><form role="form" id="projectform"><div class="form-group"><div class="form-group"><label for="description" class="requiredField">GPS Collection Form</label><textarea class="form-control" rows="3" id="date" placeholder="Text input..."></textarea></div><em class="text-muted">Click submit to add a point at this location.</em><div id="formHelp"></div><hr /><button type="submit" id="submit" class="btn btn-default btn-sm">Submit</button></form></div>';
    
	//Add marker visually on the map
	var marker = L.marker(e.latlng).addTo(map).bindPopup(form);
	

    setTimeout(function() {
		marker.openPopup();
    }, 100);
	
	
	marker.on('popupopen', function() {
		
		let dateForm = document.getElementById("projectform");	
		dateForm.addEventListener("submit", (e) => {
			e.preventDefault();
			
			let date = document.getElementById("date").value;
		
			var link = "https://docs.google.com/forms/d/e/" + formID + "/viewform?usp=pp_url&entry." + formlatID + "=" + lat + "&entry." + formlngID + "=" + lng + "&entry." + formdateID + "=" + date + "&submit=Submit"
			window.open(link)
		});
	});

	
	
	
	if (marker) {
        marker.on('popupclose', function() {
        map.removeLayer(marker);
        });
	}
};

window.addEventListener('resize', function() {
  map.invalidateSize();
});

map.on('click', onMapClick);
