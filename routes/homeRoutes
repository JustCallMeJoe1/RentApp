/*

    Author: Joe Strickland
    Route Module for general site navigation
    Date: December 31st, 2022

*/

const express = require("express");
const mainController = require("../controllers/mainController");

const mainRouter = express.Router();

//GET / index page
mainRouter.get("/", mainController.index);

//GET /newReport page
mainRouter.get("/newReport", mainController.getNewReport);

//GET /prevReport page
mainRouter.get("/prevReport", mainController.getPrevReport);

module.exports = mainRouter;