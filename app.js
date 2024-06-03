require('dotenv').config();

const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

//Templating Engine
app.use(expressLayout);
app.set('view engine', 'ejs');


const layoutPath = './layouts/main';
app.set('layout', layoutPath);


const viewsPath = path.join(__dirname, 'views');
app.set('views', path.join(__dirname, 'views'));
app.set('views', viewsPath);

app.use('/', require('./server/routes/main'));


app.listen(PORT, ()=> {
    console.log('App listening on port ${PORT}');
});

