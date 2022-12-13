const mongoose=require('mongoose');
const uri='mongodb+srv://malnud:malnud@cluster0.jzkouaj.mongodb.net/Malnud?retryWrites=true&w=majority';
const connecttomongo=()=>{
    mongoose.connect(uri).then((data)=>{
        console.log('Connected to databse successfully '+ data.Connection.name)
    }).catch((err)=>{
        console.log(err);
    })
};
module.exports=connecttomongo;












