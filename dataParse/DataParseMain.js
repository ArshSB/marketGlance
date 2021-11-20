import parseWinnipegPropertyAssessment from "./WinnipegPropertyAssessmentParse.js";

function main()
{
    // Local variable dictionary
    let WINNIPEG_PROPERTY_ASSESSMENT_FILEPATH = "../data/winnipeg_property_assessment.json";

    // Parse Winnipeg property assessment
    parseWinnipegPropertyAssessment(WINNIPEG_PROPERTY_ASSESSMENT_FILEPATH);
}
