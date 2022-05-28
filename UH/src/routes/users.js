const express = require('express');
const passport = require('passport');
const router = express.Router();

const {isAuthenticated} = require('../helpers/auth')

const Signup = require('../models/Signup'); // work to get post push delete
/* == REGISTER == */
router.get('/users/register', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { cc, name, numberPhone, address, blood, eps, email, password, confirmPassword, status } = req.body;

    const errors = [];
    if (!cc) {
        errors.push({ text: 'Please Write your Identification.' });
        //req.flash('error_msg', 'Please Write your Full Name.');
    }
    if (!name) {
        errors.push({ text: 'Please Write your Full Name.' });
        //req.flash('error_msg', 'Please Write your Full Name.');
    }
    if (!numberPhone) {
        errors.push({ text: 'Please Write a Number Phone.' });
        //req.flash('error_msg', 'Please Write your Full Name.');
    }
    if (!address) {
        errors.push({ text: 'Please Write your residencial address' });
        //req.flash('error_msg', 'Please Write your Full Name.');
    }
    if (!blood) {
        errors.push({ text: 'Please select your blood type.' });
        //req.flash('error_msg', 'Please Write your Full Name.');
    }
    if (!email) {
        errors.push({ text: 'Please Write your Email.' });
        //req.flash('error_msg', 'Please Write your Email.');
    }
    if (!password) {
        errors.push({ text: 'Please Write your Password.' });
        //req.flash('error_msg', 'Please Write your Password.');
    }
    if (!confirmPassword) {
        errors.push({ text: 'Please Write your Password Confirmation.' });
        //req.flash('error_msg', 'Please Write your Password Confirmation.');
    }
    if (password != confirmPassword) {
        errors.push({ text: 'The Passwords are not equally.' });
        //req.flash('error_msg', 'The Passwords are not equally.');
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters.' });
        //req.flash('error_msg', 'Password must be at least 4 characters.');
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            cc,
            name,
            numberPhone, 
            address, 
            blood,
            eps,
            email,
            password,
            confirmPassword,
            status
        });
    } else {

        const ccUser = await Signup.findOne({ cc: cc });

        if (ccUser) {
            errors.push({ text: 'The User is already.' });
            //req.flash('error_msg', 'The Email is already in use.');
            res.render('users/signup', { errors });
        } else {
            const newUser = new Signup({ cc, name, numberPhone, address, blood, eps, email, password, status: 'enable' });
            // console.log(newUser);
            newUser.password = await newUser.encryptPassword(password); // Save the password encrypted
            await newUser.save();
            req.flash('success_msg', 'You are registered.');
            res.redirect('/users/signin');
        }
    }
});


/* == SIGNIN == */
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {

    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/logout', isAuthenticated, (req, res) => {
    
    req.logout();
    req.flash('success_msg', "You're logout. Bye |:-)");
    res.redirect('/');

});


module.exports = router;

