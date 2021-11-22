const fs = require("fs");
const csvToObj = require("csv-to-js-parser").csvToObj;

/*
Link resource.
https://www.npmjs.com/package/csv-to-js-parser
*/

// Local variable dictionary
const HOUSE_DATA_CSV_FILEPATH = "../../data/house_data.csv";
const HOUSE_DATA_JSON_FILEPATH = "../../data/house_data.json";

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

// Convert csc to object
let object = csvToObj(houseDataCSV, ',', DESCRIPTION);

// Write to json
let houseDataJSON = JSON.stringify(object);

// Write the json contents to file
fs.writeFile(HOUSE_DATA_JSON_FILEPATH, houseDataJSON, "utf-8",
    (err) => {
        if (err)
        {
            console.log("Error: Failed to write to JSON file.");
            console.log(err);
        }
        else
        {
            console.log("JSON file has been saved.");
        }
    }
)
