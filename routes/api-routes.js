const express = require('express');
const router = express.Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
  
    })
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
  
    })

});

router.get("/api/workouts/:id", (req, res) => {
    
        const { id } = req.params;
        db.Workout.findOne({
            _id: id,
        }).then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json
        })
   
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    // console.log(body, params)
    const id = params.id;
    let savedExercises = [];

    // gets all the currently saved exercises in the current workout
    db.Workout.find({_id: id})
        .then(dbWorkout => {
            // console.log(dbWorkout);
            savedExercises = dbWorkout[0].exercises;
            // console.log('savedExcercises', savedExercises);
            // console.log('longway', dbWorkout[0].exercises);
            res.json(savedExercises);
            // console.log('body', body);
            let allExercises = [...savedExercises, body];
            // console.log('allExercises', allExercises);
            updateWorkout(allExercises);
        })
        .catch(err => {
            res.json(err);
        });

    function updateWorkout(exercises){
        db.Workout.findByIdAndUpdate(id, {exercises: exercises}, function(err, doc){
        if(err){
            console.log(err)
        }
        })
    }        
});


module.exports = router;