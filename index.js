const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const StudentModel = require('./student');
const SessionModel = require("./session");
const AttendModel = require("./attend");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/student")
    

app.post("/", (req, res) => {
    StudentModel.create(req.body)
        .then(student => res.json(student))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await StudentModel.findOne({ email });
        if (user) {
            if (user.password === password) {
                res.json({ message: "Success", role: user.role });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/create", (req, res) => {
    SessionModel.create(req.body)
        .then(session => res.json(session))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/attend", async (req, res) => {
    const { name, code } = req.body;
    const date = new Date();
    const formattedTime = date.toTimeString().split(' ')[0];

    try {
        
        const latestSession = await SessionModel.findOne().sort({ updatedAt: -1 });

        
        if (latestSession && latestSession.code === code) {
           
            await AttendModel.create({ name, code, timestamp: date });
            res.json({ message: "Success", time: formattedTime });
        } else {
            res.status(404).json({ message: "Invalid attendance code" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/attend', (req, res) => {
    SessionModel.find()
        .then(attendance => res.json(attendance))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log("Server up and running on port 3001");
});
