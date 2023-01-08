/*

    Author: Joe Strickland
    Controller Module for new report navigation
    Performs the operation specified by the route regarding new report navigation
    Date: Jan 7th, 2023

*/

const reportModel = require("../models/report");

//Post method for submitting a new report to the database
exports.submitNew = (req, res, next) => {

    let submittedReport = new reportModel(req.body);

    submittedReport.total = calcTotal(req.body);

    //Async function to await the saving functionality, catch errors
    async function saveReport() {
        try {
            const result = await submittedReport.save();
            console.log(result)
            res.redirect("/prevReport")
        } catch(e) {
            console.log("Error while saving...")
            res.render("error", {error: e});
        }
    }
    
    saveReport();
};

//Deriving the total summation of values from req.body. (For submitNew REST method)
//TODO exclude certain mapping costs, Electricity pays for 2 months prior, advancement costs are for previous months
const calcTotal = (body) => {
    const values = Object.values(body)
    const disVals = []
    let runningTotal = 0;

    for(let i = 2; i < values.length; i++) {
        disVals.push(values[i])
    }

    const numVals = disVals.map(num => parseFloat(num));

    numVals.forEach(num => {
        runningTotal += num;
    })

    return runningTotal;
}