const express = require('express');
const {admin, checkLogin} = require('./controllers/adminController');
const router = new express.Router();

// Route for the admin page (GET request)
router.get('/', admin);

// Route for handling POST requests (if needed)
router.post('/', checkLogin);

module.exports = router;
