const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema({
    name: String
});

const company = mongoose.model('company', companySchema);

module.exports = company;