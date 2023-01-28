/*

    Author: Joe Strickland
    Helper file containing all the functions for mapping report dates
    Date: Jan 28th, 2023

*/

//Mapping the report months
exports.mapAdvDate = (repMonth, repYear) => {
    let mapMonth = "";
    let mapYear = "";

    switch(repMonth) {
        case "January":
            mapMonth = "October";
            mapYear = (parseInt(repYear) - 1).toString();
            break;
        case "February":
            mapMonth = "November";
            mapYear = (parseInt(repYear) - 1).toString();
            break;
        case "March":
            mapMonth = "December";
            mapYear = (parseInt(repYear) - 1).toString();
            break;
        case "April":
            mapMonth = "January";
            mapYear = repYear;
            break;
        case "May":
            mapMonth = "February";
            mapYear = repYear;
            break;
        case "June":
            mapMonth = "March";
            mapYear = repYear;
            break;
        case "July":
            mapMonth = "April";
            mapYear = repYear;
            break;
        case "August":
            mapMonth = "May";
            mapYear = repYear;
            break;
        case "September":
            mapMonth = "June";
            mapYear = repYear;
            break;
        case "October":
            mapMonth = "July";
            mapYear = repYear;
            break;
        case "November":
            mapMonth = "August";
            mapYear = repYear;
            break;
        case "December":
            mapMonth = "September";
            mapYear = repYear;
            break;
        case "Default":
            mapMonth = "ERROR";
            mapYear = "ERROR";
            break;
    }

    return [repMonth, repYear];
};
