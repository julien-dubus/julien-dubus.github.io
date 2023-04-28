// Initialize markers array

var map = L.map('map').setView([63.42, 10.43], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; OpenStreetMap contributors',
	maxZoom: 18
}).addTo(map);


// Add new markers to the map and open google form
function onMapClick(e) {
	var lat = e.latlng.lat;
	var lng = e.latlng.lng;
	var form = '<div id="formdiv"><form role="form" id="projectform"><div class="form-group"><div class="form-group"><label for="description" class="requiredField">GPS Collection Form</label><textarea class="form-control" rows="3" id="descrip" placeholder="Text input..."></textarea></div><em class="text-muted">Click submit to add a point at this location.</em><div id="formHelp"></div><hr /><button type="submit" id="submit" class="btn btn-default btn-sm">Submit</button></form></div>';
    
	//Add marker visually on the map
	var marker = L.marker(e.latlng).addTo(map).bindPopup(date);
	
	if (marker) {
        marker.on('popupclose', function() {
        map.removeLayer(marker);
        });
}


map.on('click', onMapClick);


