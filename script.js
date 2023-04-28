// Initialize markers array

localStorage.clear();

var map;
SetMap();
var markers = [];
var markerCount = 0;

// Check local storage for saved markers
if (localStorage.markers) {
    markers = JSON.parse(localStorage.markers);

    // // Add saved markers to the map
    // markers.forEach(function(marker) {
    //     var date = marker.date;
    //     var latlng = L.latLng(marker.lat, marker.lng);
    //     var newMarker = L.marker(latlng).addTo(map);
    //     newMarker.bindPopup(date);
    // });
}


// Add a DeleteMarker button
var DeleteMarkerButton = document.getElementById("DeleteMarkerButton");
DeleteMarkerButton.addEventListener("click", deleteLastMarker);
DeleteMarkerButton.disabled = true;

// Add a CreateLink button
var LinkButton = document.getElementById('LinkButton');
LinkButton.addEventListener('click', function() {
    CreateDownloadLink();
});



// Add new markers to the map and save them
function onMapClick(e) {
    var date = prompt("In what year did this store close ?", "");
    if (date == null) {
        return
    }
    var marker = L.marker(e.latlng).addTo(map);
    marker.bindPopup(date);

    // Save marker to local storage
    var newMarker = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        date: date
    };
    markers.push(newMarker);
    localStorage.setItem('markers', JSON.stringify(markers));

    // Increase markerCount by one and enable the DeleteMarker button
    markerCount++;
    DeleteMarkerButton.disabled = false;
}

map.on('click', onMapClick);

function SetMap() {
    map = L.map('map').setView([63.42, 10.43], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
}

function CreateDownloadLink() {
    var storedMarkers = localStorage.getItem('markers');
    if (storedMarkers) {
        var markers = JSON.parse(storedMarkers);

        // Create CSV content from markers
        var csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "latitude,longitude,date\n";
        markers.forEach(function(marker) {
            csvContent += marker.lat + "," + marker.lng + "," + marker.date + "\n";
        });

        // Create a Blob object and create a download link
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_markers.csv");
        link.innerHTML = "Download CSV file";

        // Add the download link to the document body
        document.body.appendChild(link);
    }
}

function deleteLastMarker() {
    map.remove();
    markers.pop();
    markerCount--;
	SetMap();
	map.on('click', onMapClick);
    markers.forEach(function(marker) {
        var date = marker.date;
        var latlng = L.latLng(marker.lat, marker.lng);
        var newMarker = L.marker(latlng).addTo(map);
        // newMarker.bindPopup(date);
    });
	localStorage.setItem('markers', JSON.stringify(markers));
	if (markerCount == 0) {
		DeleteMarkerButton.disabled = true;
	}
}