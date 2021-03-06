const express = require('express')
const router = express.Router()
const { isLoggedIn, notLoggedIn } = require('../../config/auth')

// Welcome Page
router.get('/', notLoggedIn, (req, res) => {
  res.render('home')
})
// Dashboard
router.get('/dashboard', isLoggedIn, (req, res) =>{
  const name = req.user.name
  res.render('dashboard', { name })
})

module.exports = router