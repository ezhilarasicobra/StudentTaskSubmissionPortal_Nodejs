  const mongoose=require('mongoose')
 const taskMessage=require('../modules/tasks')
 
 const  gettasks= async(req,res)=>{
  try {
    const taskMessages=await taskMessage.find()
    res.status(200).json(taskMessages)
  } catch (error) {
    res.status(404).json({message:error})
  }
}
const  createtask= async (req,res)=>{
const post=req.body

 const newpost =new taskMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
  try {  
    await newpost.save()
    res.status(201).json(newpost)
  } catch (error) {
    res.status(409).json({message:error})
  }
}
const updatetask= async (req,res)=>{
const {id:_id}=req.params
const post=req.body
if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID")
const updatedPost=await taskMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
res.json(updatedPost)
}
const deletetask=async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID")
  await taskMessage.findByIdAndDelete(id)
  res.json({message:'post deleted successfully'})

}
const likepost=async(req,res)=>{
  if(!req.userId) res.json({message:'unauthenticated'})
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID")
  const post=await taskMessage.findById(id)
  const index=post.likes.findIndex((id)=>{id===String(req.userId)})
  if(index===-1){
    post.likes.push(req.userId)
    //like the one
  }else{
    //dislike a post
    post.likes = post.likes.filter((id)=>id!==String(req.userId))
  }
  const updatedPost=await taskMessage.findByIdAndUpdate(id,post,{new:true})
  res.json(updatedPost)
}
module.exports={gettasks,createtask,updatetask,deletetask}
//module.exports=getPosts