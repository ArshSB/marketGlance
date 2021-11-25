const fs = require("fs");

function getHouseAssessmentDictionary()
{
    // Local variable dictionary
    const HOUSE_ASSESSMENT_DATA_JSON_FILEPATH = "../data/winnipeg_property_assessment.json";

    // Get the json data
    let houseAssessmentDataJSON = fs.readFileSync(HOUSE_ASSESSMENT_DATA_JSON_FILEPATH).toString();

    // Parse the json string to js object and return
    return JSON.parse(houseAssessmentDataJSON);
}

module.exports = getHouseAssessmentDictionary;
