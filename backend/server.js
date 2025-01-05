require('dotenv').config()



const bodyParser = require('body-parser');
const mongoose = require('mongoose')


const express = require('express')

// express app
const app = express()

const workroute = require('./routes/workout')
const userroute = require('./routes/userroutes')


//midllware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workout', workroute)
app.use('/api/user', userroute)




//connect to db

mongoose.connect(process.env.MONG_URI)

.then(()=>{
//listen for request
    app.listen(process.env.PORT, () => {
        console.log('connected to db listening on port',process.env.PORT)
})
})


.catch((error)=>{
    console.log(error)
})


