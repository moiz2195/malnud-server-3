const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror.js');
const ErrorHandler = require('../middlewares/errorhandler.js');
const authmodel=require('../model/auth.js');
const jwt=require('jsonwebtoken')
const {isadmin,verifyToken}=require('../middlewares/authentication.js');

router.post('/login',asyncerror(async(req,res,next)=>{
const resp =await authmodel.findOne({email:req.body.email});
if(!resp){
    return next(new ErrorHandler('Email is incorrect',404))
}
if(resp.password!==req.body.password){
    return next(new ErrorHandler('Incorrect credentials',405))
}
const token= jwt.sign({id:resp.id},'hostel@21')
res.status(201).json({success:true,token})
}))
module.exports=router