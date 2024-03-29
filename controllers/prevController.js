/*

    Author: Joe Strickland
    Controller Module for new report navigation
    Performs the operation specified by the route regarding new report navigation
    Date: Jan 7th, 2023

*/
const reportModel = require("../models/report");

//Get method to retreive a specific report from the database and then display back
exports.getReport = (req, res, next) => {
    let reportId = req.params.id;
    
    async function getSpecificReport() {
        try {
            const result = await reportModel.findById(reportId);
            const insuranceCost = result.insurance;
            result.total = result.total - parseFloat(insuranceCost)        

            //Split up result rent cost into seperate tenanet costs
            let joeHalf = fillArray(result);
            let mackayHalf = fillArray(result);
            
            //Adjust for renter insurance
            mackayHalf[13] = parseFloat(insuranceCost);
            mackayHalf[14] += parseFloat(insuranceCost);
           
            //Create other misc info to pass
            const overallTotal = (result.total + parseFloat(insuranceCost));
            const currentMonth = (result.month);

            res.render("viewReport", {joeHalf, mackayHalf, overallTotal, currentMonth});

        } catch(e) {
            console.log("Error when retreiving the specific report.");
            next("error", {error: e});
        }
    }

    getSpecificReport();

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

const fillArray = (result) => {
    let array = [];
    array.push((parseFloat(result.rent)) / 2).toFixed(2);
    array.push((parseFloat(result.cable)) / 2).toFixed(2);
    array.push((parseFloat(result.trashService)) / 2).toFixed(2);
    array.push((parseFloat(result.amenity)) / 2).toFixed(2);
    array.push((parseFloat(result.alarm)) / 2).toFixed(2);
    array.push((parseFloat(result.d2d)) / 2).toFixed(2);
    array.push((parseFloat(result.electricity)) / 2).toFixed(2);
    array.push((parseFloat(result.pest)) / 2).toFixed(2);
    array.push((parseFloat(result.water)) / 2).toFixed(2);
    array.push((parseFloat(result.billing)) / 2).toFixed(2);
    array.push((parseFloat(result.storm)) / 2).toFixed(2);
    array.push((parseFloat(result.trash)) / 2).toFixed(2);
    array.push((parseFloat(result.sewer)) / 2).toFixed(2);
    array.push(0);
    array.push((parseFloat(result.total)) / 2).toFixed(2);
    return array;
};