const express = require('express')
const ephbs = require('express-handlebars')
const routes = require('./routes')
const session = require('express-session')
const flash = require('connect-flash')
const PORT = process.env.PORT || 3000
const app = express()

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
app.use(flash())
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg')
  res.locals.errorMsg = req.flash('errorMsg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})