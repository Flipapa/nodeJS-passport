const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/User')
const { notLoggedIn } = require('../../config/auth')

// Login Page
router.get('/login', notLoggedIn, (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// Logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('successMsg', 'You are logged out')
  res.redirect('/users/login')
})

// Register Page
router.get('/register', notLoggedIn, (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body
  const regiUser = await User.findOne({ email: email })
  let regiErrors = []
  // check required fields
  if (!name || !email || !password || !password2) {
    regiErrors.push({ msg: 'Please fill in all fields' })
  }
  // check password matches
  if (password !== password2) {
    regiErrors.push({ msg: 'Passwords do not match' })
  }
  // check password length
  if (password.length < 6) {
    regiErrors.push({ msg: 'Password should be at least 6 characters' })
  }
  // check existed user
  if (regiUser) {
    regiErrors.push({ msg: 'Email is already registered' })
  }

  if (regiErrors.length > 0) {
    res.render('register', { regiErrors, name, email, password, password2 })
  } else {
    const newUser = new User({ name, email, password })
    // hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        // set password to hash
        newUser.password = hash
        // save user
        newUser.save()
          .then(user => {
            req.flash('successMsg', 'You are now registered and can log in')
            res.redirect('/users/login')
          })
          .catch(error => console.log(error))
      })
    })
  }
})

module.exports = router