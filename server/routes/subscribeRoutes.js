const express = require('express');
const router = express.Router();
const subscribeController = require('./controllers/subscribeController');  // Passe den Pfad an

router.post('/subscribe', subscribeController.handleSubscribe);
router.get('/subscribe', subscribeController.showSubscribePage);

module.exports = router;
