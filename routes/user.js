const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror.js');
const ErrorHandler = require('../middlewares/errorhandler.js');
const usermodel=require('../model/user.js');
const cloudinary=require('cloudinary')
const {isadmin,verifyToken}=require('../middlewares/authentication.js')
const cron=require('node-cron')
const sendmsg=require('../utilis/sendmsg.js')

/// Add user
router.post('/adduser',asyncerror(async(req,res,next)=>{
    // console.log(req.body)
    // if(req.body.phone_number.toString().length!==10){
    //     return next(new ErrorHandler('length of phone number should be 10',405))
    // }
const result=await cloudinary.v2.uploader.upload(req.body.id_front,{
    folder:'id'
})
const result2=await cloudinary.v2.uploader.upload(req.body.id_back,{
    folder:'id'
})
req.body.Id_back={url:result2.url,public_id:result2.public_id}
req.body.Id_front={url:result.url,public_id:result.public_id}
const newuser=await usermodel.create(req.body);
res.status(201).json({success:true,newuser});
}))
///add profile
router.post('/addprofile',asyncerror(async(req,res,next)=>{
 if(req.body.id===undefined&&req.body.profile===undefined&&req.body.profile===''){
    return next(new ErrorHandler('Selec valid file'))
 }
const result=await cloudinary.v2.uploader.upload(req.body.profile,{
    folder:'profile'
});
let profile={url:result.url,public_id:result.public_id}
const newuser=await usermodel.findByIdAndUpdate(req.body.id,{
   profile
})
res.status(200).json({success:true})
}))
//Get all users
router.get('/getalluser',asyncerror(async(req,res,next)=>{
const allusers=await usermodel.find()
res.status(201).json({success:true,allusers});
}))
//Delete single users
router.delete('/user/:id',asyncerror(async(req,res,next)=>{
const user=await usermodel.findByIdAndDelete(req.params.id)
res.status(201).json({success:true,user});
}))
//Get single users
router.get('/getuser/:id',asyncerror(async(req,res,next)=>{
const user=await usermodel.findById(req.params.id)
res.status(201).json({success:true,user});
}))
//Update fees
router.put('/fees/:id',asyncerror(async(req,res,next)=>{
const userid=req.params.id
const Updateduser=await usermodel.findByIdAndUpdate(userid,{paid:true})
res.status(201).json({success:true,Updateduser});
}))
//Update fees
router.put('/fees/unpaid/:id',asyncerror(async(req,res,next)=>{
const userid=req.params.id
const Updateduser=await usermodel.findByIdAndUpdate(userid,{paid:false})
res.status(201).json({success:true,Updateduser});
}))
//Get all money paid
router.get('/paidamount',asyncerror(async(req,res,next)=>{
   const paiduser=await usermodel.find({paid:true}) ;
   let amount=0;
   paiduser.forEach((elem)=>{
    amount+= elem.Fees
   });
   res.status(200).send({success:true,amount})
}))
//Get all money unpaid
router.get('/unpaidamount',asyncerror(async(req,res,next)=>{
   const paiduser=await usermodel.find({paid:false}) ;
   let amount=0;
   paiduser.forEach((elem)=>{
      amount+=elem.Fees
   });
   res.status(200).send({success:true,amount})
}))
// 0 0 0 * * *
cron.schedule('0 0 0 * * *',async()=>{
    const notverify=await usermodel.find({paid:false});
    notverify.forEach((elem)=>{
     sendmsg(elem.phone_number)
    })
})


module.exports=router