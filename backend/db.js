
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/paytm")

//Creatre a Schema for the Users
const userSchema = mongoose.Schema({
  userName :String,
  firstName:String,
  lastName : String,
  password : String
})
const User = mongoose.model("User",userSchema)

module.exports={
  User
}