function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('errorMsg', 'Please log in to view this page')
  res.redirect('/users/login')
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/dashboard')
}

module.exports = { isLoggedIn, notLoggedIn }