
function getHouseAssessmentDictionary(HOUSE_ASSESSMENT_FILEPATH)
{
    // Local variable dictionary
    let houseAssessmentJSON; // Content of house assessment in json format

    // Get the house data csv file
    const req = new XMLHttpRequest();
    req.onload = function () {
        houseAssessmentJSON = req.response;
    }
    req.open("GET", HOUSE_ASSESSMENT_FILEPATH, false);
    req.send();

    // Parse the json string to js object and return
    return JSON.parse(houseAssessmentJSON);
}

export {getHouseAssessmentDictionary};
