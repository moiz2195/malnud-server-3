const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter your name"],
        unique:[true,"This user name is already added"]
    },
    phone_number:{
        type:Number,
        required:[true,"Enter your Phone number"]
    },
    security:{
        type:Number,
    },
    Fees:{
        type:Number,
        required:true
    },
    joining_date:{
        type:String,
        required:true
    },
    profile:{
      public_id:{
        type:String
      },
      url:{
        type:String
      }
    },
    Id_front:{
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      }
    },
    Id_back:{
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      }
    },
    address:{
   type:String,
   required:true
    },
    paid:{
        type:Boolean,
        default:false
    }
});
const model=mongoose.model("User",userSchema)

module.exports=model;