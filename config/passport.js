const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')  // Load User Model

function loginVerify(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await User.findOne({ email })
      // Match User
      if (!user) return done(null, false, { message: 'Email is not registered' })
      // Match password
      const passCompare = await bcrypt.compare(password, user.password)
      return passCompare ? done(null, user) : done(null, false, { message: 'Password incorrect' })
    }
    ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user)
    })
  })
}

module.exports = loginVerify