//Using Express

const express = require('express');
const movieData = require('./movie-data-short.json');
const path = require('path');
const ejs = require('ejs');
const {send} = require('process');
const session = require('express-session');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(session({secret: "secret"}));

//ByPass Button
app.get('/homePage', (req, res) => {
    res.render('homePage.ejs', {movies: movieData});

})

//SignUp Button
app.get('/homePage/:user', (req, res) => {
    req.session.username = req.params.user;
    res.render('homePage.ejs', {movies: movieData});

})

app.get('/movie/:ID',(req,res) =>{
    let ID = req.params.ID;

    let reqMovie={};

    for (let i = 0; i < movieData.length; i++) {
        if (movieData[i].imdbID == ID) {
            reqMovie = Object.assign({}, movieData[i]);
            break;
        }
    }

    res.render('movie.ejs', {movie: reqMovie});
})

app.get('/myAccount', (req, res) => {


    res.render('accountPage.ejs');
})

app.get('/search', (req, res) => {


    res.render('search.ejs');
})

app.get('/mainPage', (req, res) => {


    res.render('mainPage.ejs');
})




app.listen(port, ()=>console.log('Server running on port 3000!'));
