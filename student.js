const mongoose = require("mongoose");

const Studentschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['Student', 'Teacher'],
        required: true
    }
});

const StudentModel = mongoose.model("Student", Studentschema);
module.exports = StudentModel;
