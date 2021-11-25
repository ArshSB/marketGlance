import {csvToObj} from "./csv_to_js_parser.js";

function getHouseDataObject(HOUSE_DATA_FILEPATH)
{
    // Local variable dictionary
    let houseDataCSV; // Content of house data in csv format

    // Get the house data csv file
    const req = new XMLHttpRequest();
    req.onload = function () {
        houseDataCSV = req.response;
    }
    req.open("GET", HOUSE_DATA_FILEPATH, false);
    req.send();

    // CSV data description
    const DESCRIPTION =
        {
            address:       {type: "string", group: 1},
            roll_number:   {type: "string", group: 1},
            year_of_sale:  {type: "number", group: 1},
            month_of_sale: {type: "number", group: 1},
            sale_price:    {type: "string", group: 1},
            longitude:     {type: "number", group: 1},
            latitude:      {type: "number", group: 1}
        };

    // Convert and return csv to array object
    return csvToObj(houseDataCSV, ',', DESCRIPTION);
}

export {getHouseDataObject};
