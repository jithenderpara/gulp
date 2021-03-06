﻿var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var loginSchema = new mongoose.Schema({
        id: ObjectId,
        firstName: { type: String, required: '{PATH} is required.' },
        lastName: { type: String, required: '{PATH} is required.' },
        email: { type: String, required: '{PATH} is required.', unique: true },
        password: { type: String, required: '{PATH} is required.' },
        data: Object,
})
module.exports.User = mongoose.model("logins", loginSchema)
