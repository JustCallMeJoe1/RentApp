/*

    Author: Joe Strickland
    Route Module for previous report navigation
    Date: January 7th, 2023

*/

const express = require("express");
const prevController = require("../controllers/prevController");

const prevRouter = express.Router();

//GET /prevReport/:id
prevRouter.get("/:id", prevController.getReport);

//POST /prevReport/search
prevRouter.post("/search", prevController.searchReport);

module.exports = prevRouter;