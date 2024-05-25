const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    module: String
}, { timestamps: true }); 

const SessionModel = mongoose.model("Session", sessionSchema);
module.exports = SessionModel;
