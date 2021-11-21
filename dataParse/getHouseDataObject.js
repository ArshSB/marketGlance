const fs = require("fs");
const csvToObj = require("csv-to-js-parser").csvToObj;

export default function getHouseDataObject()
{
    // Local variable dictionary
    const HOUSE_DATA_CSV_FILEPATH = "../data/house_data.csv";

    // Get the CSV data
    let houseDataCSV = fs.readFileSync(HOUSE_DATA_CSV_FILEPATH).toString();

    // CSV data description
    const DESCRIPTION =
        {
            address:       {type: "string", group: 1},
            roll_number:   {type: "string"},
            year_of_sale:  {type: "number"},
            month_of_sale: {type: "number"},
            sale_price:    {type: "string"},
            longitude:     {type: "number"},
            latitude:      {type: "number"}
        };

    // Convert and return csv to array object
    return csvToObj(houseDataCSV, ',', DESCRIPTION);
}
