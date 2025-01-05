const express = require('express')

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout

}= require('../Controllers/workoutControllers')



const Workout = require('../models/workouts')

const router = express.Router()


// get all workout
router.get('/', getWorkouts)


//get a single workout
router.get('/:id',getWorkout)


//post a new workout
router.post('/', createWorkout)

    


//delete a workout
router.delete('/:id', deleteWorkout)

// update a workout
router.patch('/:id', updateWorkout)


module.exports = router