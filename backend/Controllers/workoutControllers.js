const Workout = require('../models/workouts')




const mongoose = require('mongoose')



//get all workouts
const getWorkouts = async(req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({  user_id }).sort({createdAT: -1})

    res.status(200).json(workouts)
}


//get a single workout
const getWorkout = async(req,res) => {
    const { id } = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findById(id)
    
    if(!workout) {
        return res.status(404).json({error: 'no such workout'})
    }
    res.status(200).json(workout)
}



//create a new workout

const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body

    

    //add to db
        try{
            const user_id = req.user._id
            const workout = await Workout.create({title, reps, load, user_id})

            return res.status(200).json(workout)
        }catch(error){
            res.status(400).json({error: error.message})

        }

    res.json({mssg: 'post a new workout'})

}







//delte a workout


const deleteWorkout = async(req, res) =>{
    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }


    const workout = await Workout.findOneAndDelete({_id: id })

    
    if(!workout) {
        return res.status(404).json({error: 'no such workout'})
    }

    res.status(200).json(workout)



}






//update a workout

const updateWorkout =  async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }


    const workout = await Workout.findOneAndUpdate({_id: id}, {
         ...req.body
    })


    if(!workout) {
        return res.status(400).json({error: 'no such workout'})
    }



    res.status(200).json(workout)
}




module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}