const express = require('express');
const router = express.Router();
const photoController = require('./controllers/photoController');

// Get photos by category
router.get('/spring-summer', (req, res) => {
    req.params.category = 'Spring/Summer';
    photoController.getPhotosByCategory(req, res);
});

router.get('/fall-winter', (req, res) => {
    req.params.category = 'Fall/Winter';
    photoController.getPhotosByCategory(req, res);
});

// Get all photos
router.get('/photos', photoController.getAllPhotos);

// Get a specific photo
router.get('/photos/:id', photoController.getPhotoById);

// Add a new photo
router.post('/photos', photoController.createPhoto);

// Delete a photo
router.delete('/photos/:id', photoController.deletePhoto);

module.exports = router;
