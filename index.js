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
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set ('views', path.join(__dirname, '/views/pages'));

// console.dir(app);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(mongoSanitize({
  replaceWith: '_'
}))
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.min.css",
    "https://fonts.cdnfonts.com/css/effra-heavy",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
    "https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.theme.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.transitions.css"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/douqbebwk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                "https://bootdey.com/",
                "https://demo.tortoizthemes.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

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