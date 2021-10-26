const express=require('express')
const router=express.Router()
const {gettasks,createtask,updatetask,deletetask}=require('../controllers/tasks.js')
const auth=require('../middleware/auth.js')
//const createpost=require('../controllers/posts.js')
//checking routes
//router.get('/',(req,res)=>{
  //res.send('checking')
  //})
///http://localhost:5000/posts
router.get('/',gettasks)

router.post('/',auth,createtask)
router.patch('/:id',auth,updatetask)
router.delete('/:id',auth,deletetask)


module.exports=router