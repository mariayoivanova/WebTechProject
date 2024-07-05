/*require('dotenv').config();

const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/routes/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

//connect to DB
connectDB();


app.use(express.static(path.join(__dirname, 'public')));


//Templating Engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout','./layouts/main' );
app.set('views',path.join(__dirname, 'views'));


//const layoutPath = './layouts/main';
//app.set('layout', layoutPath);


//const viewsPath = path.join(__dirname, 'views');
//app.set('views', path.join(__dirname, 'views'));
//app.set('views', viewsPath);

//Routen

//const mainRoutes = 
const mainRoutes = require('./server/routes/main'); 

app.use('/',mainRoutes);


app.listen(PORT, ()=> {
    console.log('App listening on port ${PORT}');
});

//require('dotenv').config();

*/

require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/routes/config/db');

const app = express();
const PORT = process.env.PORT || 5001;  // Korrigiere die PORT-Variable

// Verbinde zur Datenbank
connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Templating Engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname, 'views'));

 //Routen
const postRoutes = require('./server/routes/postRoutes'); // Importiere den Router für CRUD-Operationen
const adminRoutes = require('./server/routes/adminRoutes');
const subscribeRoutes = require('./server/routes/subscribeRoutes');
const photoRoutes = require('./server/routes/photoRoutes');

app.use('/', postRoutes); // Verwende den importierten Router
app.use('/admin', adminRoutes);
app.use('/', subscribeRoutes);
app.use('/', photoRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
