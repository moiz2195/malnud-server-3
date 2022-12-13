const express=require('express');
const app=express();
const connecttomongo=require('./db.js');
const cors=require('cors')
const cloudinary=require('cloudinary')
const bodyParser=require('body-parser')
const errorMiddleware=require('./middlewares/errorhandler.js')
app.use(cors({
  origin : 'http://malnud.wisemonk.xyz',
}))
connecttomongo();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use('/api/user',require('./routes/user.js'));
app.use('/api/auth',require('./routes/auth.js'));
app.use(errorMiddleware);
cloudinary.config({
    cloud_name: 'dv16ih3ou', 
    api_key: '279521592167543', 
    api_secret: '8-NUHAmJH4fXpNIJ2tGqsFXpxM4' 
  });
module.exports=app;