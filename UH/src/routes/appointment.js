const express = require('express');
const router = express.Router();

const Appointment = require('../models/Appointment'); // work to get post push delete
const {isAuthenticated} = require('../helpers/auth')

router.get('/makeanappointment', isAuthenticated, (req, res) => {
    res.render('notes/makeanappointment');
});

router.post('/user/new-appointment', isAuthenticated, async (req, res) => {
    const { cc, typeAppointment, description } = req.body;
    console.log(req.body.cc)
    const errors = [];
    if (!cc) {
        errors.push({text: 'Please Write your CC.'});
    }
    if (!typeAppointment) {
        errors.push({text: 'Please Write the Type Appointment.'});
    }
    if (!description) {
        errors.push({text: 'Please Write a desctiption.'});
    }
    if(errors.length > 0) {
        res.render('notes/makeanappointment', {
            errors,
            cc,
            typeAppointment,
            description
        }); 
    } else {
        const newAppointment = new Appointment({cc, typeAppointment, description});
        newAppointment.id = req.user.id
        console.log(newAppointment);
        await newAppointment.save();
        req.flash('success_msg', 'Appointment Added Successfull.');
        res.redirect('/idAppointment');
    }
});

router.get('/view/appointment', isAuthenticated, async (req, res) => {
    // res.send('DRUGS from database.');

    await Appointment.find({}).then(appointments => {
        // console.log(drugs)
        res.render('notes/view-appointment', { 
            appointments: appointments.map(Appointment => Appointment.toJSON())
        })
    });
});

module.exports = router;