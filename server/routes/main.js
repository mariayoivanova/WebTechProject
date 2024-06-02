const express = require('express');
const router = express.Router();


//Routes
router.get('', (req, res) => {

    const locals = {
        titel: "Blog",
        description: "Blog usefull for everyone"
    }

    res.render('index', {locals});
});

router.get('/about', (req, res) => {
    res.render('about');
});



module.exports = router;
