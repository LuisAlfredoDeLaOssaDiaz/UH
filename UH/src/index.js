const express = require('express');
const path = require('path');
const { engine: exphbs } = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const server = express();
require('./database');
require('./config/passport');


// Settings
server.set('port', process.env.PORT || 4000);
server.set('views', path.join(__dirname, 'views'));
server.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(server.get('views'), 'layouts'),
    partialsDir: path.join(server.get('views'), 'partials'),
    extname: '.hbs'
}));
server.set('view engine', '.hbs');



// Middlewares  
server.use(express.urlencoded({ extended: false })); // Envia los metodos post, get, put, delete...
server.use(methodOverride('_method'));
server.use(express.json());
server.use(session({
    secret: 'miclavesecreta',
    resave: true,
    saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

// Global Variables
server.use ((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')

    res.locals.user = req.user || null;

    next();
})

// Routes

server.use(require('./routes/index'));
server.use(require('./routes/notes'));
server.use(require('./routes/users'));
server.use(require('./routes/appointment'));
server.use(require('./routes/medicaments'));


// Static Files

server.use(express.static(path.join(__dirname, 'public')));

// Server is listenning

server.listen(server.get('port'), _ => {
    console.log('Server on port: ' + server.get('port'));

});