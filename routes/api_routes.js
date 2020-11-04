const db = require("../models/workout");
require("mongoose");

module.exports = (app) => {


    // creating/posting a workout
    app.post("/api/workouts", (req, res) => {

        db.Workout.create({}, (err, data) => {
            if (err) {
                console.log("error", err);
            } else {
                res.json(data)
            }
        })
    });
    // searches for recent workout
    app.get("/api/workouts", (req, res) => {

        db.Workout.find({}, (err, data) => {
            if (err) {
                console.log("error", err);
            } else {
                res.json(data)
            }
        })
    });
    // finding workout by id
    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findByIdAndUpdate(req.params.id,

            { $push: { exercises: req.body } },
            { new: true },
            (err, data) => {
                if (err) {
                    console.log("error", err);
                } else {
                    res.json(data)
                }
            });
    });

    // searches for workout by range 
    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).sort({ day: 1 }).limit(7).then(data => {
            console.log(data)
            res.json(data)
        })
            .catch(err => {
                console.log("error", err);
            });
    });
};