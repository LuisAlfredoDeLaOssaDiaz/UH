const helpers = {};
// funcion para autenticar los usuarios y dar el siguiente paso
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
	return next();
    }
    req.flash('error_msg', 'Not Authorized.');
    res.redirect('/users/signin');
};

module.exports = helpers;