const express = require('express');
const postController = require('./controllers/postController');
const router = new express.Router()
// Route für die Startseite
router.get('/', postController.getPosts);;

router.post('/posts', postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.patch('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;

