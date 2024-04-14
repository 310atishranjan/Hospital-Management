const express=require("express");
const {registerController, loginController, makeAdmin, getpersonalDetails,logout, updatePassword } = require("../controller/userController");
const {isuserAuth,isadminAuth, isdoctorAuth} =require("../middlewares/auth.js");
const {getDoctorlist,addDoctor} = require("../controller/doctorController");
const router=express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.post('/add-Admin',isadminAuth,makeAdmin);

//personal details

router.get('/patient-details',isuserAuth,getpersonalDetails);
router.get('/admin-details',isadminAuth,getpersonalDetails);
router.get('/doctor-details',isdoctorAuth,getpersonalDetails);

router.post('/add-doctor',isadminAuth,addDoctor);
router.get('/get-doctorlist',getDoctorlist);

//logout section

router.post('/logout',isuserAuth,logout);
router.post('/logout',isadminAuth,logout);
router.post('/logout',isdoctorAuth,logout);

//update
router.put('/update-password',isuserAuth,updatePassword);
router.put('/update-password',isadminAuth,updatePassword);
router.put('/update-password',isdoctorAuth,updatePassword);


module.exports=router;