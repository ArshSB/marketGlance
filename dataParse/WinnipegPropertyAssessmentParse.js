const puppeteer = require("puppeteer");

/*
Duy Anh Nguyen
WinnipegPropertyAssessmentParse.js

Parse the house assessment data from the City of Winnipeg
    website and save it into a json file.

Function:
parseWinnipegPropertyAssessment() - Parse the property
    assessment and save it to a given filepath.
getProperty() - Get the property of the text using xPath.
*/

/* parseWinnipegPropertyAssessment()
Parameter:
ASSESSMENT_URL - The link to the assessment page for scraping.
rollNumberArray - Array of roll number of the property to
    get house assessment data.

Return:
An array with with parsed information relate to the roll number
    property.
It will start with the roll number for identification and follow
    by the assessment information relate to the property.
*/
async function parseWinnipegPropertyAssessment(ASSESSMENT_URL, rollNumberArray)
{
    // Local variable dictionary
    const BROWSER = await puppeteer.launch();     // Head-less browser
    const BROWSER_PAGE = await BROWSER.newPage(); // Browser page
    let parsedAssessment = [];

    // Go through each roll number of parse the property assessment information
    let count = 1;
    for (let rollNumber of rollNumberArray)
    {
        // Print roll reading information to console
        console.log(count + ": " + rollNumber);
        count++;

        // Property assessment information object
        const propertyAssessment =
            {
                rollNumber: rollNumber,
                assessedValue: "",
                yearBuilt: "",
                livingArea: "",
                landArea: "",
                buildingType: "",
                basement: "",
                basementFinish: ""
            };

        // Local variable dictionary
        let property; // The property of the webpage contain the desired information for scrape

        // Go to the webpage
        await BROWSER_PAGE.goto(ASSESSMENT_URL + rollNumber);

        // Get assessment value
        propertyAssessment.assessedValue = await getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[1]/td/table/tbody/tr[3]/td[3]");

        // Get year built
        propertyAssessment.yearBuilt = await getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[6]/td[1]");

        // Get living area
        propertyAssessment.livingArea = await getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[2]/td[1]");

        // Get land area
        propertyAssessment.landArea = await getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[5]/td/table/tbody/tr[3]/td[1]");

        // Get building type
        propertyAssessment.buildingType = await getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[3]/td[1]");

        // Get basement
        propertyAssessment.basement = await getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[4]/td[1]");

        // Get basement finish
        propertyAssessment.basementFinish = await getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[4]/td[1]");

        // Save the information
        parsedAssessment.push(propertyAssessment);
    }

    // Release resource
    await BROWSER_PAGE.close();
    await BROWSER.close();

    // Return the parsed assessment array
    return parsedAssessment;
}

/* getProperty()

Parameter:
contentString - Container for the content.
BROWSER_PAGE - The browser page to scrape information.
xPath - The xPath to the property.
*/
async function getProperty(contentString, ROWSER_PAGE, xPath)
{
    // Local variable dictionary
    let element;  // The element scraping
    let property; // The element property scraping

    // Get assessment value
    try
    {
        [element] = await BROWSER_PAGE.$x(xPath);
        property = await element.getProperty("textContent");
        propertyString = property._remoteObject.value;
    }
    catch (err)
    {
        propertyString = "Visit the assessment link.";
    }

    // Return the property
    return property;
}

module.exports = parseWinnipegPropertyAssessment;
