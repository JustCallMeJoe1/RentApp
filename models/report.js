/*

    Author: Joe Strickland
    Model file to store object literals that will represent the report data. Also includes interface to manipulate the data.
    Date: January 7th, 2023

*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    month: {
        type: String,
        required: [true, "The month of the report is required."],
        enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },

    year: {
        type: Number,
        required: [true, "The year of the report is required."],
        min: [2022, "The minimum value for year is 2022, not allowed to go lower."],
        max: [2099, "The maximum value for year is 2099, not allowed to go higher."],
    },

    rent: {
        type: String,
        required: [true, "The rent cost for the report is required."],
        minlength: [1, "Rent field must have at least 1 character."],
        maxlength: [20, "Rent field can have a maximum of 20 characters."],
    },

    cable: {
        type: String,
        required: [true, "The cable cost for the report is required."],
        minlength: [1, "Cable field must have at least 1 character."],
        maxlength: [20, "Cable field can have a maximum of 20 characters."],
    },

    trashService: {
        type: String,
        required: [true, "The trash service cost for the report is required."],
        minlength: [1, "Trash service field must have at least 1 character."],
        maxlength: [20, "Trash service field can have a maximum of 20 characters."],
    },

    amenity: {
        type: String,
        required: [true, "The amenity cost for the report is required."],
        minlength: [1, "Amenity field must have at least 1 character."],
        maxlength: [20, "Amenity field can have a maximum of 20 characters."],
    },

    alarm: {
        type: String,
        required: [true, "The alarm cost for the report is required."],
        minlength: [1, "Alarm field must have at least 1 character."],
        maxlength: [20, "Alarm field can have a maximum of 20 characters."],
    },

    d2d: {
        type: String,
        required: [true, "The door to door cost for the report is required."],
        minlength: [1, "Door to door field must have at least 1 character."],
        maxlength: [20, "Door to door field can have a maximum of 20 characters."],
    },

    insurance: {
        type: String,
        minlength: [1, "Insurance field must have at least 1 character."],
        maxlength: [20, "Insurance field can have a maximum of 20 characters."],
    },

    electricity: {
        type: String,
        required: [true, "The electricity cost for the report is required."],
        minlength: [1, "Electricity field must have at least 1 character."],
        maxlength: [20, "Electricity field can have a maximum of 20 characters."],
    },

    pest: {
        type: String,
        required: [true, "The pest cost for the report is required."],
        minlength: [1, "Pest field must have at least 1 character."],
        maxlength: [20, "Pest field can have a maximum of 20 characters."],
    },

    water: {
        type: String,
        required: [true, "The water cost for the report is required."],
        minlength: [1, "Water field must have at least 1 character."],
        maxlength: [20, "Water field can have a maximum of 20 characters."],
    },

    billing: {
        type: String,
        required: [true, "The billing cost for the report is required."],
        minlength: [1, "Billing field must have at least 1 character."],
        maxlength: [20, "Billing field can have a maximum of 20 characters."],
    },

    storm: {
        type: String,
        required: [true, "The stormwater cost for the report is required."],
        minlength: [1, "Stormwater field must have at least 1 character."],
        maxlength: [20, "Stormwater field can have a maximum of 20 characters."],
    },

    trash: {
        type: String,
        required: [true, "The trash cost for the report is required."],
        minlength: [1, "Trash field must have at least 1 character."],
        maxlength: [20, "Trash field can have a maximum of 20 characters."],
    },

    sewer: {
        type: String,
        required: [true, "The sewer cost for the report is required."],
        minlength: [1, "Sewer field must have at least 1 character."],
        maxlength: [20, "Sewer field can have a maximum of 20 characters."],
    },

    total: {
        type: Number,
    }

});

module.exports = mongoose.model("report", reportSchema);