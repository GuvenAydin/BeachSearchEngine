// middleware function to check for logged-in users
exports.sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }
};

exports.userIsAuthenticated = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }
};

