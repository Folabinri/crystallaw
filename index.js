if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const app = express()
const path = require ('path')
const port = process.env.PORT || 3000;
// app.use(express.static('img'));
app. use(express.static(path. join(__dirname, 'public')));

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set ('views', path.join(__dirname, '/views/pages'));

// console.dir(app);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
  res.locals.title = "Home"; 
  res.render('home')
})
app.get('/about', (req, res) => {
  res.locals.title = "About"; 
  res.render('about')
})
app.get('/practice', (req, res) => {
  res.locals.title = "Practice"; 
  res.render('practice')
})
app.get('/team', (req, res) => {
  res.locals.title = "Team"; 
  res.render('team')
})
app.get('/contact', (req, res) => {
  res.locals.title = "Contact"; 
  res.render('contact')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;