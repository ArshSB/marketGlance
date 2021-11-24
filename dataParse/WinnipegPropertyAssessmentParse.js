const puppeteer = require("puppeteer")

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
<<<<<<< HEAD
    let parsedAssessment = {};
    let scrapeErrorMessage = "Visit the assessment link."
=======
    let parsedAssessment = [];
>>>>>>> 6c6b6fd (Fixed bus not write to file and tested on small number of roll, ready for the big test. About to make some final adjustment to asyn for improvement.)

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
<<<<<<< HEAD
        property = getProperty(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[1]/td/table/tbody/tr[3]/td[3]")
            .then(
                propertyAssessment.assessedValue = (property != undefined) ? property._remoteObject.value : scrapeErrorMessage;
            );

        // Get year built
        property = getProperty(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[6]/td[1]")
            .then(
                propertyAssessment.yearBuilt = (property != undefined) ? property._remoteObject.value : scrapeErrorMessage;
            );

        // Get living area
        property = getProperty(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[2]/td[1]")
            .then(
                propertyAssessment.livingArea = (property != undefined) ? property._remoteObject.value : scrapeErrorMessage;
            );

        // Get land area
        property = getProperty(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[5]/td/table/tbody/tr[3]/td[1]")
            .then(
                propertyAssessment.landArea = (property != undefined) ? property._remoteObject.value : scrapeErrorMessage;
            );

        // Get building type
        property = getProperty(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[3]/td[1]")
            .then(
                propertyAssessment.buildingType = (property != undefined) ? property._remoteObject.value : scrapeErrorMessage;
            );

        // Get basement
        property = getProperty(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[4]/td[1]")
            .then(
                propertyAssessment.basement = (property != undefined) ? property._remoteObject.value : scrapeErrorMessage;
            );

        // Get basement finish
        property = getProperty(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[4]/td[1]")
            .then(
                propertyAssessment.basement = (property != undefined) ? property._remoteObject.value : scrapeErrorMessage;
            );
=======
        propertyAssessment.assessedValue = getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[1]/td/table/tbody/tr[3]/td[3]")

        // Get year built
        propertyAssessment.yearBuilt = getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[6]/td[1]");

        // Get living area
        propertyAssessment.livingArea = getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[2]/td[1]")

        // Get land area
        propertyAssessment.landArea = getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[5]/td/table/tbody/tr[3]/td[1]")

        // Get building type
        propertyAssessment.buildingType = getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[3]/td[1]")

        // Get basement
        propertyAssessment.basement = getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[4]/td[1]")

        // Get basement finish
        propertyAssessment.basementFinish = getPropertyString(BROWSER_PAGE, "//*[@id=\"ctl00_ContentPlaceHolder1_pnlSingleParcelInfo\"]/table[2]/tbody/tr[4]/td/table/tbody/tr[4]/td[1]")
>>>>>>> 6c6b6fd (Fixed bus not write to file and tested on small number of roll, ready for the big test. About to make some final adjustment to asyn for improvement.)

        // Save the information
        await parsedAssessment.push(propertyAssessment);
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
<<<<<<< HEAD
    [element] = await BROWSER_PAGE.$x(xPath);
    property = (element.getProperty != undefined) ? element.getProperty("textContent") : undefined;
=======
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
>>>>>>> 6c6b6fd (Fixed bus not write to file and tested on small number of roll, ready for the big test. About to make some final adjustment to asyn for improvement.)

    // Return the property
    return property;
}

module.exports = parseWinnipegPropertyAssessment;
