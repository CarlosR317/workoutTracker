const db = require("../models/workout");
const mongoose = require("mongoose");

module.exports = (app) => {


    // creating or posting a workout

    app.post("/api/workouts", (req, res) => {

        db.Workout.create({}).then(data => res.json(data))

            .catch(err => {

                console.log("error", err);

                res.json(err);

            });
    });

    // finding workout by id
    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findByIdAndUpdate(req.params.id,

            { $push: { exercises: req.body } },
            { new: true, runValidators: true })

            .then(data => res.json(data))

            .catch(err => {

                console.log("error", err);

                res.json(err);

            });

    });

    // searches for workout by range no more than 7

    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).limit(7).then(data => res.json(data))
            .catch(err => {
                console.log("error", err);
                res.json(err);
            });
    });

    // get the last workout

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(data => res.json(data))
            .catch(err => {
                console.log("error", err);
                res.json(err);
            });
    });

    // puts it all on the "/"

    app.get("*", (req, res) => {

        res.redirect("/public/exercise.html");

    });


};