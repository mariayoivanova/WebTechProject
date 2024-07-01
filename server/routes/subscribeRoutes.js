const express = require('express');
const subscribeController = require('./controllers/subscribeController');  // Corrected path
const router = express.Router();

router.get('/subscribe', subscribeController.showSubscribePage);
router.post('/subscribe', subscribeController.handleSubscribe);

module.exports = router;
