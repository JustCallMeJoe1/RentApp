/*

    Author: Joe Strickland
    Controller Module for new report navigation
    Performs the operation specified by the route regarding new report navigation
    Date: Jan 7th, 2023

*/

const reportModel = require("../models/report");
const reportMapping = require("../controllers/reportMapping");

//Post method for submitting a new report to the database
exports.submitNew = (req, res, next) => {

    //(No Advancement + No electricity) If the advancement costs are left blank, then renter is there for first 3 months (No charge for prev months of no living there)
    if(req.body.pest === "0" && req.body.water === "0" && req.body.billing === "0" && req.body.storm === "0" && req.body.trash === "0" && req.body.sewer === "0" && req.body.electricity === "0") {

        //These values need to be thrown out, but app needs to retain the other fees. Submit app as normal but do not do any advancement logic
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
                next("error", {error: e});
            }
        }
            
        saveReport();
    
    //(No Advancement + Electricity)
    } else if(req.body.pest === "0" && req.body.water === "0" && req.body.billing === "0" && req.body.storm === "0" && req.body.trash === "0" && req.body.sewer === "0" && req.body.electricity !== "0") {

        const advElec = req.body.electricity;
        req.body.electricity = "0";

        let reportDate = reportMapping.mapElecDate(req.body.month, req.body.year);

        async function updateElec() {
            try{
                const result = await reportModel.findOneAndUpdate(
                    {
                        month: reportDate[0], 
                        year: reportDate[1]
                    },
                    {
                        electricity : advElec,
                    },
                    {
                        upsert: true,
                    }
                );
            } catch (e) {
                console.log("Error while updating electricity advancement.");
                next("error", {error: e});
            };
        };

        updateElec();

        async function updateAdvElecTotal() {
            let updateSum = 0;
            try {
                const findResult = await reportModel.findOne({ month: reportDate[0], year: reportDate[1] });

                updateSum += parseFloat(findResult.total); 
                updateSum += parseFloat(findResult.electricity);

            } catch(e) {
                console.log("Error while updating electricity advancement total.");
                next("error", {error: e});
            }

            try {
                const result = await reportModel.findOneAndUpdate(
                    {
                        month: reportDate[0], 
                        year: reportDate[1]
                    },
                    {
                        total : updateSum,
                    },
                    {
                        upsert: true,
                    },
                )
            } catch(e) {
                console.log("Error while updating electricity advacement total.");
                next("error", {error: e});
            };

        };

        updateAdvElecTotal();

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
                next("error", {error: e});
            }
        }
            
        saveReport();

    //(Advancement + Electricity)
    } else {
        console.log("advancement");
        //Seperate out the advancements to place in a previous report. Set the current month's advancements to 0 as they are not known.
        let advFees = seperateAdvFees(req.body);
        setAdvDefault(req.body);

        //Electricity is a monthly cost, seperate out the electricity submission.
        const advElec = req.body.electricity;
        req.body.electricity = "0";

        let reportDateElec = reportMapping.mapElecDate(req.body.month, req.body.year);

        //If the default was triggered, something has gone really wrong.
        if(reportDateElec[0] === "ERROR" || reportDateElec[1] === "ERROR") {
            console.log("Advancement Electric Date mapping error. Default triggered.")
            let mapError = new Error("Invalid month entered for report. Please try again.");
            mapError.status = 400;
            return next(mapError);
        }


        async function updateElec() {
            try{
                const result = await reportModel.findOneAndUpdate(
                    {
                        month: reportDateElec[0], 
                        year: reportDateElec[1]
                    },
                    {
                        electricity : advElec,
                    },
                    {
                        upsert: true,
                    }
                );
            } catch (e) {
                console.log("Error while updating electricity advancement.");
                return next("error", {error: e});
            };
        };

        updateElec();

        async function updateAdvElecTotal() {
            let updateSum = 0;
            try {
                const findResult = await reportModel.findOne({ month: reportDateElec[0], year: reportDateElec[1] });

                updateSum += parseFloat(findResult.total); 
                updateSum += parseFloat(findResult.electricity);

            } catch(e) {
                console.log("Error while updating electricity advancement total.");
                return next("error", {error: e});
            }

            try {
                const result = await reportModel.findOneAndUpdate(
                    {
                        month: reportDateElec[0], 
                        year: reportDateElec[1]
                    },
                    {
                        total : updateSum,
                    },
                    {
                        upsert: true,
                    },
                )
            } catch(e) {
                console.log("Error while updating electricity advacement total.");
                return next("error", {error: e});
            };

        };

        updateAdvElecTotal();

        //Determine the month and year the advancement costs must go to. [Month, Year]
        let reportDate = reportMapping.mapAdvDate(req.body.month, req.body.year);

        //If the default was triggered, something has gone really wrong.
        if(reportDate[0] === "ERROR" || reportDate[1] === "ERROR") {
            console.log("Advancement Date mapping error. Default triggered.")
            let mapError = new Error("Invalid month entered for report. Please try again.");
            mapError.status = 400;
            return next(mapError);
        }

        console.log(reportDate[0], reportDate[1]);

        //Async function to await the updating of prev advancements, catch errors
        async function updateAdv() {
            try {
                const result = await reportModel.findOneAndUpdate(
                    { 
                        month: reportDate[0], 
                        year: reportDate[1]
                    },
                    { 
                        pest: advFees[0],
                        water: advFees[1],
                        billing: advFees[2],
                        storm: advFees[3],
                        trash: advFees[4],
                        sewer: advFees[5],
                    },
                    {
                        upsert: true
                    }
                );
                
                console.log("Advancement updated.")
                console.log(result);

            } catch(e) {
                console.log("Error while updating advancements...");
                return next("error", {error: e});
            }
        }

        updateAdv();

        //Need to update the total now that the advacncement fees are entered.
        async function updateAdvTotal() {
            let updateSum = 0;
            try {
                const findResult = await reportModel.findOne({ month: reportDate[0], year: reportDate[1] });

                updateSum += parseFloat(findResult.total); 
                updateSum += parseFloat(findResult.pest);
                updateSum += parseFloat(findResult.water);
                updateSum += parseFloat(findResult.billing);
                updateSum += parseFloat(findResult.storm);
                updateSum += parseFloat(findResult.trash);
                updateSum += parseFloat(findResult.sewer);

            } catch(e) {
                console.log("Error when updating advancement total...");
                return next("error", {error: e});
            }

            console.log(updateSum);

            try {
                const updateResult = await reportModel.findOneAndUpdate(
                    { 
                        month: reportDate[0], 
                        year: reportDate[1] 
                    },
                    {
                        total: updateSum
                    },
                    {
                        upsert: true
                    }
                );
                
                console.log("Total updated.")
            } catch(e) {
                console.log("Error when updating advancement total...");
                return next("error", {error: e});
            }

        }

        updateAdvTotal();

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
                return next("error", {error: e});
            }
        }
            
        saveReport();
        
    }
};

//Seperate out the submitted advancement fees for processing
const seperateAdvFees = (body) => {
    let temp = [];
    temp.push(body.pest);
    temp.push(body.water);
    temp.push(body.billing);
    temp.push(body.storm);
    temp.push(body.trash);
    temp.push(body.sewer);
    return temp;
}

//Default advacnement costs to 0 as they do not exist.
const setAdvDefault = (body) => {
    body.pest = "0";
    body.water = "0";
    body.billing = "0";
    body.storm = "0";
    body.trash = "0";
    body.sewer = "0";
}

//Deriving the total summation of values from req.body. (For submitNew REST method)
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