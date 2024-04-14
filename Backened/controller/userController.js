const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer');
//function for register the user:
const registerController = async(req,res)=> {
    try {  
        const {firstname,lastname,email,phone,password,idProof,gender,dob,role} = req.body;
        if( !firstname || !lastname || !email || !phone || !password || !idProof||!gender||!dob||!role)
        {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }
        //check the user properly through their emailid and password:
        const exisiting = await userModel.findOne({ email:email});
        if (exisiting) 
        {
            return res.status(500).send({
                success: false,
                message: "Email Already Registerd",
            });
        }
        
        let hashPassword = await bcrypt.hash(password,10);
        // create a new user:
        const user = await userModel.create({
            firstname, 
            lastname,
            email,
            phone,
            idProof,
            gender,
            dob,
            password:hashPassword,
            role
      });

      console.log(user);
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '31golu.s@gmail.com', // your email
            pass: 'gzem eiqq lmiw rbqe' // your password
        }
    });
    let toEmail=req.body.email;
    let mailOptions = {
      from: '31golu.s@gmail.com', // sender address
      to: toEmail, // list of receivers
      subject: 'Welcome to our website!', // Subject line
      html: `<p> Dear ${firstname} ${lastname} <br> Thank you for registering on our website!</p>` // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
      //if user created successfully:
      return res.status(200).send({
        success: true,
        message: "User is Successfully Registered",
        user,
      });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
    });
    }
}

const loginController=async(req,res)=>{
    try{
    const {email,password,confirmpassword,role}=req.body;

    if(!email||!password||!confirmpassword||!role)
    {
        return res.status(400).json({
            message:"provide all details",
            success:false
        })
    }
    const user=await userModel.findOne({email:email});
    if(!user)
    {
        return res.status(400).json({
            message:"email not found",
            success:false
        })
    }
    if(role!==user.role)
    {
        return res.status(404).json({
            message:"user with this role not valid",
            success:false
        })
    }
    if(password !== confirmpassword)
    {
        return res.status(400).json({
            message:"password and confirmpassword doesnot match",
            success:false
        })
    }
    let compare=await bcrypt.compare(password,user.password);
    if(!compare)
    {
        return res.status(400).json({
            message:"crediantials doesnot match",
            success:true
        })
    }
    const payload={
        email:user.email,
        id:user._id,
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"1d"
    });
    
    const options={
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
        sameSite:'none',
    }
    if(user.role==="patient"){
        // res.cookie("Patienttoken",token,options);
        // res.cookie("Patienttoken",token,options).status(200).json({
        //     token,
        //     message:"login successful",
        //     success:true
        // })
        return res.status(200).json({
            user,
            token,
            message:"login successful",
            success:true
        })
      
    }
    else if(user.role==="admin")
    {
        // res.cookie("Admintoken",token,options).status(200).json({
        //     token,
        //     message:"login successful",
        //     success:true
        // })
        return res.status(200).json({
            user,
            token,
            message:"login successful",
            success:true
        })
    }
    else if(user.role==="doctor")
    {
        // res.cookie("Doctortoken",token,options).status(200).json({
        //     token,
        //     message:"login successful",
        //     success:true
        // })
        return res.status(200).json({
            user,
            token,
            message:"login successful",
            success:true
        })
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"error in login",
            success:false
        })
    }
}

const makeAdmin=async(req,res)=>{
    try {  
        const {name,email,phone,password,idProof,gender,dob} = req.body;
        if( !name || !email || !phone || !password || !idProof||!gender||!dob)
        {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }
        //check the user properly through their emailid and password:
        const exisiting = await userModel.findOne({ email:email});
        if (exisiting) 
        {
            return res.status(500).send({
                success: false,
                message: "Email Already Registerd",
            });
        }
        
        let hashPassword = await bcrypt.hash(password,10);
        // create a new user:
        const user = await userModel.create({
            name, 
            email,
            phone,
            idProof,
            gender,
            dob,
            password:hashPassword,
            role:"admin"
      });

      console.log(user);
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '31golu.s@gmail.com', // your email
            pass: 'gzem eiqq lmiw rbqe' // your password
        }
    });
    let toEmail=req.body.email;
    let mailOptions = {
      from: '31golu.s@gmail.com', // sender address
      to: toEmail, // list of receivers
      subject: 'Welcome to our website!', // Subject line
      html: `<p> Dear ${name} <br> Thank you for registering on our website!</p>` // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
      //if user created successfully:
      return res.status(201).send({
        success: true,
        message: "User is Successfully Registered",
        user,
      });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
    });
    }
}

const getpersonalDetails=async(req,res)=>{
    const details=req.user;
    if(!details)
    {
        return res.status(401).json({
            message:"user not found",
            success:false
        })
    }
    return res.status(200).json({
        message:"user found successfully",
        success:true,
        details
    })
}

const updatePassword=async(req,res)=>{
    try{
        const {oldpassword,newpassword}=req.body;
        const data=req.user;
        let compare=await bcrypt.compare(oldpassword,data.password);
        if(!compare)
        {
            return res.status(400).json({
                message:"previous password not matched",
                success:false
            })
        }
        let hashPassword=await bcrypt.hash(newpassword,10);
        data.password=hashPassword;
        await data.save();
        return res.status(200).json({
            message:'password updated',
            success:true
        })
    }catch(err){
        return res.status(500).json({
            message:"error in updating password",
            success:false
        })
    }

}

const logout=async(req,res)=>{
    try{
    const {role}=req.user;
   
    let token;
    if(role==='patinet')
    token="Patienttoken";

    else if(role==='admin')
    token="Admintoken";

    else if(role==='doctor')
    token="Doctortoken";

    // return res.status(200).cookie(token,"",{
    //     // httpOnly:true,
    //     expires:new Date(Date.now()+3*24*60*60*1000),
    //   }).json({
    //       message:"logout successful!",
    //       success:false,
    //   });
    return res.status(200).json({
        message:"logout succcessful",
        success:true,
    })
    }catch(error)
    {
        return res.status(500).json({
            message:"error in logout",
            success:false
        })
    }
}

module.exports={registerController,
    loginController,
    makeAdmin,
    getpersonalDetails,
    updatePassword,
    logout
};