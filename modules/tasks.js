const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
  Task_Tile:String,
  Front_End_Github_Url:String,
  Back_end_Github_url:String,
  Front_End_Deployment_Url:String,
  Back_End_Deployment_Url:String,
  creator:String,
  createdAt:{
    type:Date,
    default:new Date()
  }
})

module.exports=mongoose.model('tasksubmission',taskSchema)