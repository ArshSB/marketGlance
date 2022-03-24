import {getHouseDataObject} from "./getHouseDataObject.js";
import {getHouseAssessmentDictionary} from "./getHouseAssessmentDictionary.js";

function addMarkers(markers, map, HOUSE_DATA_FILEPATH, HOUSE_ASSESSMENT_FILEPATH) {

    /*
    then creates markers holding the specific data (through Google Map InfoWindow object)
    for each house in an array to be clustered later
     */

    // Local variable dictionary
    let houseData = getHouseDataObject(HOUSE_DATA_FILEPATH);
    let houseAssessmentDictionary = getHouseAssessmentDictionary(HOUSE_ASSESSMENT_FILEPATH);

    //this key-value pair will be later on used to convert an integer 'month of sale' to its respective month in string
    const numToMonth = {
        '1': 'January',
        '2': 'February',
        '3': 'March',
        '4': 'April',
        '5': 'May',
        '6': 'June',
        '7': 'July',
        '8': 'August',
        '9': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    };

    // Add markers
    for (let houseDatum of houseData)
    {
        // Convert latitude and longitude coordination for google map
        const LATITUDE_FLOAT = parseFloat(houseDatum.latitude);
        const LONGITUDE_FLOAT = parseFloat(houseDatum.longitude);

        // Winnipeg house assessment link
        const HOUSE_ASSESSMENT_URL = "http://www.winnipegassessment.com/AsmtPub/english/propertydetails/" +
            "details.aspx?pgLang=EN&isRealtySearch=true&RollNumber=" + houseDatum.roll_number;

        // Google marker
        const marker = new google.maps.Marker({
            position: {lat: LATITUDE_FLOAT, lng: LONGITUDE_FLOAT},
            title: houseDatum.sale_price.replace(/[^0-9.-]+/g,""),  //title will be later used to find mean price of all houses in a cluster
            icon: {
                url: "images/house.png",
                labelOrigin: new google.maps.Point(15, 40) //set position of label relative to the icon
            },
            label: {  //displays house price
                text: houseDatum.sale_price,
                color: "yellow",
                fontWeight: "bolder",
                fontSize: "12px"
            }
        });

        /*
        Below code adds HTML elements which hold house information
        which will be displayed to the user in an infoWindow overlay
         */

        const html =
            '<p style="color: darkred; padding-bottom: 20px; border-bottom: 2px solid darkred; font-size: 20px; font-style: normal; font-weight: 900; font-family: Lucida Console">' + houseDatum.address + '</p>'
            +
            '<b><p style="color: black; padding-bottom: 8px; font-size: 14px; font-family: Verdana;">' + 'Sale price: ' + houseDatum.sale_price + ' in ' + numToMonth[houseDatum.month_of_sale] + ' ' + houseDatum.year_of_sale + '</p></b>'
            +
            '<p style="color: gray; padding-bottom: -16px; font-size: 14px; font-family: Verdana;">' + 'Assessed market value (as of April 2018): ' + houseAssessmentDictionary[houseDatum.roll_number].assessedValue + '</p>'
            +
            '<p style="color: gray; padding-bottom: -16px; font-size: 14px; font-family: Verdana;">' + 'Year built: ' + houseAssessmentDictionary[houseDatum.roll_number].yearBuilt + '</p>'
            +
            '<p style="color: gray; padding-bottom: -16px; font-size: 14px; font-family: Verdana;">' + 'Living area: ' + houseAssessmentDictionary[houseDatum.roll_number].livingArea + '</p>'
            +
            '<p style="color: gray; padding-bottom: -16px; font-size: 14px; font-family: Verdana;">' + 'Land area: ' + houseAssessmentDictionary[houseDatum.roll_number].landArea + '</p>'
            +
            '<p style="color: gray; padding-bottom: -16px; font-size: 14px; font-family: Verdana;">' + 'Basement: ' + houseAssessmentDictionary[houseDatum.roll_number].basement + '</p>'
            +
            '<p style="color: gray; padding-bottom: -16px; font-size: 14px; font-family: Verdana;">' + 'Basement finish: ' + houseAssessmentDictionary[houseDatum.roll_number].basementFinish + '</p>'
            +
            '<p style="font-family: Verdana; font-size: 10px; font-weight: bold"> <a style="text-decoration: none;" href=' + HOUSE_ASSESSMENT_URL + ' target="_blank">(See tax assessment)</a></p>'
            +
            '<iframe width="450" height="250" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/streetview' +
            '?key=AIzaSyC4lx5Thi59RLievNBGwRzSoT8_Ts8ZGFU' +
            '&location=' + LATITUDE_FLOAT + ',' + LONGITUDE_FLOAT + '" allowfullscreen> </iframe>';
        //iframe holds street view of house location


        const infowindow = new google.maps.InfoWindow({content: html});


        //open infoWindow if user clicks on the marker
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        //add marker object to the array
        markers.push(marker);
    }
}

export { addMarkers };
