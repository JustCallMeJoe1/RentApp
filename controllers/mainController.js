/*

    Author: Joe Strickland
    Controller Module for general site navigation
    Performs the operation specified by the route regarding site navigation
    Date: Dec 31st, 2022

*/

const reportModel = require("../models/report");

//GET / index page
exports.index = (req, res, next) => {
    res.render("index");
}

//GET /newReport page
exports.getNewReport = (req, res, next) => {
    let currentYear = new Date().getFullYear();

    res.render("newReport", {currentYear});
}

//GET /prevReport page
exports.getPrevReport = (req, res, next) => {
    //Grab the computer's current year. Display all 12 months from that year
    //let searchYear = 2022;
    let searchYear = new Date().getFullYear();

    async function getReportsForYear() {
        try {
            const result = await reportModel.find({ year: searchYear });
            let existingMonths = [];
            result.forEach(report => {
                existingMonths.push(report.month)    
            });
            
            res.render("viewReports", {searchYear, existingMonths, result});
        } catch(e) {
            console.log("Error when collecting reports...");
            next("error", {error: e});
        };
    };

    getReportsForYear();

}