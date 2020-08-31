function addBar(map) {

    /*
    Following code adds a search bar to map with Google autocomplete functionality
    Returns a circle overlay on map indicating user's search location
     */

    const searchBar = document.getElementById('pac-input');

    //make search bar visible only when map loads
    searchBar.style.display = 'block';

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBar);

    //sets bounds from South West to North East so that autocomplete is restricted only to Winnipeg entries
    const defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(49.739095, -97.401582),
        new google.maps.LatLng(50.003244, -96.844564));

    const autocomplete = new google.maps.places.Autocomplete(searchBar, {bounds: defaultBounds, strictBounds: true});

    //configure circle settings, position will be applied later
    const locationCircle = new google.maps.Circle({
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.5,
        map,
        radius: 15 //in meters
    });

    autocomplete.addListener("place_changed", () => {
        searchBar.value = "";

        const location = autocomplete.getPlace();
        const locationLat = location.geometry.location.lat();
        const locationLong = location.geometry.location.lng();

        //if no autocomplete available, do nothing
        if (!location.geometry) return;

        if (location.geometry.viewport) {
            map.fitBounds(location.geometry.viewport); //recenter map to entry location
            map.setZoom(20);

            locationCircle.setCenter({ lat: locationLat, lng: locationLong });
            //give position to circle object separately to avoid multiple circles appearing for every new entry
        }
        else {
            map.setCenter(location.geometry.location);
            map.setZoom(16);
        }
    });

}

export { addBar };