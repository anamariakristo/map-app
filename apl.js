var locations = [
    { name: "Autobusni kolodvor", lat: 45.8135, lng: 15.9762 },
    { name: "Glavni kolodvor", lat: 45.8073, lng: 15.9770 },
    { name: "Park Maksimir", lat: 45.8315, lng: 16.0152 },
    { name: "Trg bana Josipa Jelačića", lat: 45.8131, lng: 15.9770 },
    { name: "Park Ribnjak", lat: 45.8228, lng: 16.0094 }
];

var map;
var directionsService;
var directionsRenderer;

function initMap() {
    var zagreb = { lat: 45.8131, lng: 15.9770 }; // Koordinate Zagreba
    map = new google.maps.Map(document.getElementById('map'), {
        center: zagreb,
        zoom: 12
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    // Dodavanje markera za svaku lokaciju
    locations.forEach(function (location) {
        var marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
            icon: 'pin/ikona.png', // Postavite putanju do vaše prilagođene ikone
        });

        // Dodavanje informacija o lokaciji prilikom klika na marker
        var infowindow = new google.maps.InfoWindow({
            content: location.name
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    });

    directionsRenderer.setMap(map);
}

function showRoute() {
    var startLocation = document.getElementById('startLocation').value;
    var endLocation = document.getElementById('endLocation').value;

    var request = {
        origin: getCoordinates(startLocation),
        destination: getCoordinates(endLocation),
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}

function getCoordinates(locationName) {
    var location = locations.find(function (loc) {
        return loc.name === locationName;
    });

    return { lat: location.lat, lng: location.lng };
}
