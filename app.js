const express = require('express')
const ephbs = require('express-handlebars')
const routes = require('./routes')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const PORT = process.env.PORT || 3000
const app = express()

require('./config/passport')(passport)
require('./config/mongoose')

app.engine('handlebars', ephbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'nysmnyd777',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global Vars
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg')
  res.locals.errorMsg = req.flash('errorMsg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})