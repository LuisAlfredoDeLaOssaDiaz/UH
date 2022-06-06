const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Signup = require('../models/Signup')

// se usa para definir si un usuario esta registrado en la base de datos o no
passport.use(new LocalStrategy({
    usernameField: 'cc',
    passwordField: 'password'
}, async (cc, password, done) => {
    const ccUser = await Signup.findOne({ cc: cc });

    if (!ccUser) {
        return done(null, false, {message: 'Unregistered user.'});
    } else {
        const math = await ccUser.matchPassword(password);
        if (!math) {
            return done(null, false, {message : 'Incorrect Password.'})           
        } else {
            return done(null, ccUser);
        }
    }
}))

// aqui serializa el usuario

passport.serializeUser((ccUser, done) => {
    done(null, ccUser.id);
});

// aqui desloguea el usuario logueado
passport.deserializeUser((id, done ) => {
    Signup.findById(id, (err, ccUser) => {
        done(err,ccUser);
    })
})