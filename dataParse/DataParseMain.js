let getHouseDataObject = require("./getHouseDataObject.js");
let parseWinnipegPropertyAssessment = require("./WinnipegPropertyAssessmentParse.js");
const fs = require("fs");

async function main()
{
    // Local variable dictionary
    const HOUSE_DATA_FILEPATH = "../data/house_data.csv";
    const PROPERTY_ASSESSMENT_URL = "http://www.winnipegassessment.com/AsmtPub/english/propertydetails/" +
        "details.aspx?pgLang=EN&isRealtySearch=true&RollNumber="; // The link to scrape
    const WINNIPEG_PROPERTY_ASSESSMENT_FILEPATH = "../data/winnipeg_property_assessment.json"; // File to write the property assessment information to
    let rollNumberArray = []; // Roll number of the houses to scrape data

    // Read the house_data.csv
    let houseData = getHouseDataObject().splice(0, 5);

    // Extract the house data for roll number
    for (let datum of houseData)
    {
        rollNumberArray.push(datum.roll_number);
    }

    // Parse Winnipeg property assessment
    console.log("Running... scraping property assessments...")
    let houseAssessmentData = await parseWinnipegPropertyAssessment(PROPERTY_ASSESSMENT_URL, rollNumberArray);

    // Save the data into a json file
    let houseAssessmentData_JSON = JSON.stringify(houseAssessmentData);
    fs.writeFile(WINNIPEG_PROPERTY_ASSESSMENT_FILEPATH, houseAssessmentData_JSON,
        "utf-8", (err) => {
            if (err)
            {
                console.log("Error: Failed to write to JSON file.");
                console.log(err);
            }
            else
            {
                console.log("JSON file has been saved.");
            }
        })
}
main().then(r => console.log("End of application."));
