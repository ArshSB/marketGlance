import {getCsv} from "./getDataFiles.js";

function addMarkers(markers, map, filePath) {

    /*
    Following code reads house data from a CSV file,
    then creates markers holding the specific data (through Google Map InfoWindow object)
    for each house in an array to be clustered later
     */


    //since PapaParse returns a JSON file which includes various objects,
    //["data"] is used to only read the original CSV data
    const data = Papa.parse(getCsv(filePath))["data"];

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


    for (let i = 1; i < data.length; i++) {

        //store individual house data in the respective variables
        const latd = parseFloat(data[i][6]);
        const long = parseFloat(data[i][5]);
        const rollNumber = data[i][1] + "";
        const address = data[i][0] + "";
        const month = data[i][3] + "";
        const year = data[i][2] + "";

        //convert decimal sale prices to integer string for easier handling
        let salePrice = (data[i][4] + "").split('.')[0];

        //variable which holds the City of Winnipeg tax assessment link for the particular house
        const propertyTax = "http://www.winnipegassessment.com/AsmtPub/english/propertydetails/" +
            "details.aspx?pgLang=EN&isRealtySearch=true&RollNumber=" + rollNumber;

        const marker = new google.maps.Marker({
            position: {lat: latd, lng: long},
            title: salePrice.replace(/\D/g, ""),  //title will be later used to find mean price of all houses in a cluster
            icon: {
                url: "images/house.png",
                labelOrigin: new google.maps.Point(15, 40) //set position of label relative to the icon
            },
            label: {  //displays house price
                text: salePrice,
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
          '<p style="color: darkred; padding-bottom: 20px; border-bottom: 2px solid darkred; font-size: 20px; font-style: normal; font-weight: 900; font-family: Lucida Console">' + address + '</p>'
            +
          '<p style="color: gray; padding-bottom: 8px; font-size: 14px; font-family: Verdana;">' + salePrice + ' in ' + numToMonth[month] + ' ' + year + '</p>'
            +
          '<p style="font-family: Verdana; font-size: 10px; font-weight: bold"> <a style="text-decoration: none;" href=' + propertyTax + ' target="_blank">(See tax assessment)</a></p>'
            +
          '<iframe width="450" height="250" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/streetview' +
            '?key=AIzaSyC4lx5Thi59RLievNBGwRzSoT8_Ts8ZGFU' +
            '&location=' + latd + ',' + long + '" allowfullscreen> </iframe>';
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
