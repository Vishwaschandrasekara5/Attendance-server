const mongoose = require("mongoose");

const AttendSchema = new mongoose.Schema({
    name: String,
    code: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const AttendModel = mongoose.model("Attendance", AttendSchema);
module.exports = AttendModel;
