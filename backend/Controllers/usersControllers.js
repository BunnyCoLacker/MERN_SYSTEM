require('dotenv').config()

const User = require('../models/users');
const jwt = require('jsonwebtoken')
const createtoken = (_id) => {
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}

//login user

const login = async (req, res)=>{
  const { email, password } = req.body;


  try{
    const user = await User.login(email, password)

    //create token
    const token = createtoken(user._id)

    res.status(200).json({email, token})
  } catch(error){
    res.status(400).json({error: error.message})

  }


}


//signup user

const signup = async (req, res)=>{
  const { email, password } = req.body;
  try{
    const user = await User.signup(email, password)

    //create token
    const token = createtoken(user._id)

    res.status(200).json({email, token})
  } catch(error){
    res.status(400).json({error: error.message})

  }

  }

  module.exports = {login,signup}