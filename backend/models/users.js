const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new mongoose.Schema({

  email: {
     type: String, 
     required: true, 
     unique: true 
},

  password: {
     type: String, 
     required: true 
},
});
//signup method
userSchema.statics.signup = async function (email, password) {

  //validation

  if(!email || !password){
    throw Error('All fields must be filled')
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }
  if(!validator.isStrongPassword(password)){
    
    throw Error('Must contain numbers special characters and Capital letter')
  }



  const exist = await this.findOne({email})

  if(exist) {
    throw Error('email already exist')
  }



  const saltpapi = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, saltpapi)
  const user = await this.create({email, password: hash})

  return user
}

//login method
userSchema.statics.login = async function (email, password) {


  if(!email || !password){
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({email})

  if(!user) {
    throw Error('Wrong email')
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match){
    throw Error('Wrong password')
  }
  
  return user
}


module.exports = mongoose.model('User', userSchema);