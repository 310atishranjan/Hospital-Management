const userModel=require('../model/userModel');
const AppointModel=require('../model/appointmentModel');
const AppointController=async(req,res)=>{
    try{
    const {
    name,
    gender,
    age,
    phone,
    appointmentDate,
    address,
    uniqueId,
    doctor_firstName,
    doctor_lastName,
    department,
    doctorId,
    patientId,
    status
    }=req.body;

    // if(!name||
    //     !gender||
    //     !age||
    //     !phone||
    //     !appointmentDate||
    //     !address||
    //     !uniqueId||
    //     !hasvisited
    //    ){
    //         return res.status(400).json({
    //             message:'all details must be filled',
    //             success:false
    //         })
    //     }
    const isConflict=await userModel.find({
        firstname:doctor_firstName,
        lastname:doctor_lastName,
        doctordepartment:department,
        role:'doctor'
    })
    if(isConflict.length===0)
    {
        return res.status(404).json({
            message:'doctor not found',
            success:false
        })
    }
    else if(isConflict.length>1)
    {
        return res.status(404).json({
            message:'common doctor ',
            success:false
        })
    }
    req.body.doctorId=isConflict[0]._id;
    let id=req.user.id;
    req.body.patientId=id;
    const appoint=new AppointModel(req.body);
    await appoint.save();
    return res.status(200).json({
        message:'appointment booked',
        success:true,
        appoint
    })
}catch(err){
    console.log(err);
    return res.status(500).json({
        message:'error in Booking',
        success:false
    })
}
}
const getallAppointment=async(req,res)=>{
    const Appointment=await AppointModel.find({
    });
    if(!Appointment){
        return res.status(400).json({
            message:'Appointment not found',
            success:false
        })
    }
    return res.status(200).json({
        message:'Appoint found',
        success:true,
        Appointment
    })

}
const getAppointment=async(req,res)=>{
    const {id}=req.user;
    const Appointment=await AppointModel.find({doctorId:id});
    if(!Appointment){
        return res.status(400).json({
            message:'Appointment not found',
            success:false
        })
    }
    return res.status(200).json({
        message:'Appointment fetched',
        success:true,
        Appointment
    })
}
const updateAppointStatus=async(req,res)=>{
    try{
    const {id}=req.params;
    let Appointment=await AppointModel.findById(id);
    if(!Appointment){
        return res.status(400).json({
            message:'data not found',
            success:false
        })
    }
    Appointment=await AppointModel.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true,
    })
    return res.status(200).json({
        message:'update successful',
        success:true,
        Appointment
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"error in updating",
            success:false
        })
    }
}
const deleteAppointment=async(req,res)=>{
    try{
        const {id}=req.params;
        let data=await AppointModel.findById({_id:id});
        if(!data){
            return res.status(400).json({
                message:"data not found",
                success:false
            })
        }
        await data.deleteOne();
        return res.status(200).json({
            message:"appointment delete success",
            success:true
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"err in deleting",
            success:false
        })
    }
}
module.exports={AppointController,
    getallAppointment,
    getAppointment,
    updateAppointStatus,
    deleteAppointment,
};