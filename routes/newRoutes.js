/*

    Author: Joe Strickland
    Route Module for new report navigation
    Date: January 7th, 2023

*/

const express = require("express");
const newController = require("../controllers/newController");

const newRouter = express.Router();

//POST /newReport
newRouter.post("/", newController.submitNew);


module.exports = newRouter;