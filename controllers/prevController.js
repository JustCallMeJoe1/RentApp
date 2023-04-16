/*

    Author: Joe Strickland
    Controller Module for new report navigation
    Performs the operation specified by the route regarding new report navigation
    Date: Jan 7th, 2023

*/
const reportModel = require("../models/report");

//Get method to retreive a specific report from the database and then display back
exports.getReport = (req, res, next) => {
    
};

//Post method to retrieve search year from user then display the year's reports back to the user
exports.searchReport = (req, res, next) => {
    const searchYear = req.body.year;
    
    async function getReportsForYearSelected() {
        try {
            const result = await reportModel.find({ year: searchYear });
            let existingMonths = [];
            result.forEach(report => {
                existingMonths.push(report.month);
            });

            res.render("viewReports", {searchYear, existingMonths, result});
        } catch(e) {
            console.log(`Error when collecting reports for the selected year: ${searchYear}`);
            next("error", {error: e});
        };
    };
    
    getReportsForYearSelected();
};