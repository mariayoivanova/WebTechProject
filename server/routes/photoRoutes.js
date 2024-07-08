const express = require('express');
const router = express.Router();
const photoController = require('./controllers/photoController');

// Display all photos
router.get('/spring-summer', photoController.getAllSpringSummerPhotos);

// Display fall/winter photos
router.get('/fall-winter', photoController.getAllFallWinterPhotos);

// Display form to add a new photo
router.get('/add-photo', photoController.getAddPhotoForm);

// Add a new photo
router.post('/add-photo', photoController.addPhoto);

// Display form to edit a photo
router.get('/edit-photo/:id', photoController.getEditPhotoForm);

// Update a photo
router.post('/edit-photo/:id', photoController.updatePhoto);

// Delete a photo
router.get('/delete-photo/:id', photoController.deletePhoto);

module.exports = router;
