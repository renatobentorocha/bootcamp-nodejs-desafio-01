const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)

const ageCheckMiddleware = (req, res, next) => {
  if (req.body.age.trim() === '') return res.redirect('/')

  return next()
}

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', ageCheckMiddleware, (req, res) => {
  let age = parseInt(req.body.age, 10)
  let queryString = `?age=${age}`

  return age > 18
    ? res.redirect(`/major${queryString}`)
    : res.redirect(`/minor${queryString}`)
})

app.get('/major', (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen(3000)
