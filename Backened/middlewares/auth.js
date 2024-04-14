const jwt=require("jsonwebtoken");
const user=require("../model/userModel.js");
const isuserAuth=async(req,res,next)=>{
    // const {Patienttoken}=req.cookies;
    // const Patienttoken=req.cookies.Patienttoken;
    const authHeader=req.headers["authorization"];
   
    if(!authHeader){
        return res.status(400).json({
            message:"token not found/unauthorised user",
            success:false
        })
    }
    const Patienttoken=authHeader.split(" ")[1];
    const decode=jwt.verify(Patienttoken,process.env.JWT_SECRET);
    const fetchUser=await user.findById(decode.id);
    if(!fetchUser)
    {
        return res.status(401).json({
            message:"user not found",
            success:false
        })
    }
    req.user=fetchUser;
    next();
}
const isadminAuth=async(req,res,next)=>{
    // const {Admintoken}=req.cookies;
    // if(!Admintoken)
    // {
    //     return res.status(400).json({
    //         message:"token not found/unauthorised admin",
    //         success:false
    //     })
    // }
    const authHeader=req.headers["authorization"];
   
    if(!authHeader){
        return res.status(400).json({
            message:"token not found/unauthorised user",
            success:false
        })
    }
    const Admintoken=authHeader.split(" ")[1];
    
    const decode=jwt.verify(Admintoken,process.env.JWT_SECRET);
    req.user=await user.findById(decode.id);
    next();
}
const isdoctorAuth=async(req,res,next)=>{
    // const {Doctortoken}=req.cookies;
    
    // if(!Doctortoken){
    //     return res.status(400).json({
    //         message:"token not found/unauthorised",
    //         success:false
    //     })
    // }
    const authHeader=req.headers["authorization"];
   
    if(!authHeader){
        return res.status(400).json({
            message:"token not found/unauthorised user",
            success:false
        })
    }
    const Doctortoken=authHeader.split(" ")[1];
    
    const decode=jwt.verify(Doctortoken,process.env.JWT_SECRET);
    req.user=await user.findById(decode.id);
    next();
}
module.exports={isuserAuth,isadminAuth,isdoctorAuth};