import mongoose from "mongoose";
const userModel = new mongoose.Schema({
  username: {
    type: String,
    required:true,
  },

  email:{
    type:String,
    required:true,
    unique:true,
  },

  password:{
    type:String,
    required:true,
  },
  token : {
    type:String,
    default:"",
  }

})

const user = new mongoose.model('user', userModel);

const todoModel = new mongoose.Schema({
   task:{
    type:String,
    require:true,
   },

   description:{
    type:String,
   },

   status:{
    type:String,
   },
   
   myUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
   }

},{
  timestamps:true
})

const todo = new mongoose.model('todo', todoModel)

export { user, todo}