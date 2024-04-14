const userModel=require('../model/userModel');
const bcrypt=require("bcryptjs");
const addDoctor=async(req,res)=>{
    try{
    const {firstname,lastname,email,phone,idProof,gender,dob,
    password,degree,specialist,doctordepartment,role}=req.body;

    if(!firstname||!lastname||!email||!phone||!idProof||!gender||!dob||!password||
        !degree||!specialist||!doctordepartment||!role){
            return res.status(400).json({
                message:"all field must filled",
                success:false
            })
    }
    const existing=await userModel.findOne({email:email});
    if(existing){
        return res.status(401).json({
            message:"email already register",
            success:true
        })
    }
        let hashPassword=await bcrypt.hash(password,10);
        req.body.password=hashPassword;
        const doctorData=new userModel(req.body);
        doctorData.save();
        return res.status(200).json({
            message:"Doctor Register success",
            success:true
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"error in doctor register",
            success:false
        })
    }
}
const getDoctorlist=async(req,res)=>{
    // const {role}=req.user;
    try{
    let role="doctor";
    const doctorData=await userModel.find({role:role});
    if(!doctorData)
    {
        return res.status(400).json({
            message:"doctor data not found",
            success:false,
        })
    }
    return res.status(200).json({
        message:"doctor data fetched",
        success:true,
        doctorData
    })
    }catch(error){
        return res.satus(500).json({
            message:"error in doctor list",
            success:false
        })
    }
}

module.exports={getDoctorlist,addDoctor}