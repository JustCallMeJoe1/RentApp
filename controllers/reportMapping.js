/*

    Author: Joe Strickland
    Helper file containing all the functions for mapping report dates
    Date: Jan 28th, 2023

*/

//Mapping the advancement costs --> month, year
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

    return [mapMonth, mapYear];
};

//Mapping the electric cost --> month, year
exports.mapElecDate = (repMonth, repYear) => {
    let mapMonth = "";
    let mapYear = "";

    switch(repMonth) {
        case "January":
            mapMonth = "December";
            mapYear = (parseInt(repYear) - 1).toString();
            break;
        case "February":
            mapMonth = "January";
            mapYear = repYear;
            break;
        case "March":
            mapMonth = "February";
            mapYear = repYear;
            break;
        case "April":
            mapMonth = "March";
            mapYear = repYear;
            break;
        case "May":
            mapMonth = "April";
            mapYear = repYear;
            break;
        case "June":
            mapMonth = "May";
            mapYear = repYear;
            break;
        case "July":
            mapMonth = "June";
            mapYear = repYear;
            break;
        case "August":
            mapMonth = "July";
            mapYear = repYear;
            break;
        case "September":
            mapMonth = "August";
            mapYear = repYear;
            break;
        case "October":
            mapMonth = "September";
            mapYear = repYear;
            break;
        case "November":
            mapMonth = "October";
            mapYear = repYear;
            break;
        case "December":
            mapMonth = "November";
            mapYear = repYear;
            break;
        case "Default":
            mapMonth = "ERROR";
            mapYear = "ERROR";
            break;
    }

    return [mapMonth, mapYear];
};
