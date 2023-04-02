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
    res.render("newReport");
}

//GET /prevReport page
exports.getPrevReport = (req, res, next) => {
    //Grab the computer's current year. Display all 12 months from that year
    //let currentYear = 2022;
    let currentYear = new Date().getFullYear();

    async function getReportsForYear() {
        try {
            const result = await reportModel.find({ year: currentYear });
            let existingMonths = [];
            result.forEach(report => {
                existingMonths.push(report.month)    
            });
            
            res.render("viewReports", {currentYear, existingMonths, result});
        } catch(e) {
            console.log("Error when collecting reports...");
            next("error", {error: e});
        };
    };

    getReportsForYear();

}