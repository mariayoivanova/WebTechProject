const express = require('express');
const router = express.Router();
const commentController = require('../routes/controllers/commentController');

router.get('/comments', commentController.getComments);
router.post('/comments', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
