const mongoose=require("mongoose");

const dbConnect=async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected");
    }catch(err){
        console.log(err);
    }
}
module.exports=dbConnect;