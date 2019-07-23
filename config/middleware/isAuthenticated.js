// not allowed if not logged in
module.exports = function(req, res, next) {
    // If the user is logged in, continue to the route
    if (req.user) {
      return next();
    }
    // If the user isn't' logged in, redirect them to the login page
    return res.redirect("/");
  };