/*

    Author: Joe Strickland
    Controller Module for general site navigation
    Performs the operation specified by the route regarding site navigation
    Date: Dec 31st, 2022

*/

//GET / index page
exports.index = (req, res, next) => {
    res.render("index");
}

//GET /newReport page
exports.getNewReport = (req, res, next) => {
    res.render("NewReportPage");
}

//GET /prevReport page
exports.getPrevReport = (req, res, next) => {
    res.render("PrevReportsPage");
}