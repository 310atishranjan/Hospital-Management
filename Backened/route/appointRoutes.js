const express=require('express');
const { AppointController, getallAppointment, getAppointment, updateAppointStatus, deleteAppointment } = require('../controller/AppointController');
const { isuserAuth, isadminAuth, isdoctorAuth } = require('../middlewares/auth');

const router=express.Router();

router.post('/book-appoint',isuserAuth,AppointController);
router.get('/get-allappoint',isadminAuth,getallAppointment);
router.get('/get-appoint',isdoctorAuth,getAppointment);
router.put('/update-status/:id',isadminAuth,updateAppointStatus);
router.delete('/delete-appoint/:id',isuserAuth,deleteAppointment);
module.exports=router;