import { configureMap } from "./configureMap.js";
import { addBar } from "./addSearchBar.js";
import { addMarkers } from './addMarkers.js';
import { addClustering } from "./addMarkerClustering.js";

window.initialize = function() {

    const mapInfo = document.getElementById("map-info");
    const load = document.getElementById("load");
    const mapDiv = document.getElementById("map");

    const custom = {
        zoom: 11,
        center: {lat: 49.8951, lng: -97.1384},
        mapTypeId: 'hybrid',
        mapTypeControl: false
    };

    //bind map variable to map element in html
    const map = new google.maps.Map(mapDiv, custom);

    addBar(map);

    const HOUSE_DATA_FILEPATH = "data/house_data.csv";
    const HOUSE_ASSESSMENT_FILEPATH = "data/winnipeg_property_assessment.json";

    //store all markers in an array so that clustering can be applied to it
    let markers = [];

    addMarkers(markers, map, HOUSE_DATA_FILEPATH, HOUSE_ASSESSMENT_FILEPATH);

    addClustering(markers, map);

    mapInfo.style.display="none";
    load.style.display="none";
    mapDiv.style.display="block";

}


configureMap();









