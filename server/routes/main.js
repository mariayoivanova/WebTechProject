/**const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const fs = require('fs');


 * Get/
 * HOME
 

//Routes
router.get('', async (req, res) => {  // Markiere die Funktion als async

    const locals = {
        title: "Blog",  
        description: "Blog useful for everyone"  
    }

    try {
        const data = await Post.find();
        res.render('index', { locals, data });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

// Funktion um Daten einzufügen
async function insertPostData() {  // Markiere die Funktion als async
    try {
        await Post.insertMany([
            {
                title: "Building a Blog",
                body: "This is the body text (test)"
            }
        ]);
        console.log("Post data inserted");
    } catch (error) {
        console.log("Error inserting post data:", error);
    }
}

insertPostData();  // Rufe die Funktion auf

// About Route
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;  */
const express = require('express');
const router = express.Router();
const path = require('path'); // Füge path-Modul hinzu
//const Post = require('../models/Post');
const fs = require('fs'); // Füge fs-Modul hinzu

console.log('Current directory:', __dirname); // Debugging Nachricht

// Konstruiere den Pfad zu Post.js
const postPath = path.join(__dirname, 'models/Post.js');
console.log('Resolved Post path:', postPath);

// Überprüfe die Existenz der Datei
fs.access(postPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`${postPath} does not exist`);
  } else {
    console.log(`${postPath} exists`);
  }
});

const Post = require(postPath); // Lade das Post-Modul

//Routes
router.get('', async (req, res) => {
  const locals = {
    title: "Blog",  // Korrigiere den Tippfehler in "titel"
    description: "Blog useful for everyone"  // Korrigiere den Tippfehler in "usefull"
  };

  try {
    const data = await Post.find();
    res.render('index', { locals, data });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

// Funktion um Daten einzufügen
async function insertPostData() {  // Markiere die Funktion als async
  try {
    await Post.insertMany([
      {
        title: "Building a Blog",
        body: "This is the body text (test)"
      }
    ]);
    console.log("Post data inserted");
  } catch (error) {
    console.log("Error inserting post data:", error);
  }
}

insertPostData();  // Rufe die Funktion auf

// About Route
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;  // Exportiere den Router
