const fs = require("fs");
const csvToObj = require("csv-to-js-parser").csvToObj;

function getHouseDataObject()
{
    // Local variable dictionary
    const HOUSE_DATA_CSV_FILEPATH = "../data/house_data.csv";

    // Get the CSV data
    let houseDataCSV = fs.readFileSync(HOUSE_DATA_CSV_FILEPATH).toString();

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
