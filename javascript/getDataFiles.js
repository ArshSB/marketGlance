function getCsv(filePath) {

    /*
    Retrieve data file from relative path through a XML request
     */


    const req = new XMLHttpRequest();
    let csv;
    req.onload = function () {
        csv = req.response;
    }
    req.open("GET", filePath, false);
    req.send();

    return csv;

}


export{ getCsv };