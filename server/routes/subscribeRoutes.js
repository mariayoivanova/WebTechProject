const express = require('express');
const router = express.Router();
const subscribeController = require('./controllers/subscribeController');

router.post('/subscribe', subscribeController.handleSubscribe);
router.get('/subscribe', subscribeController.showSubscribePage);

module.exports = router;
