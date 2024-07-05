const Photo = require('../models/Photo');

// Get all photos by category
exports.getPhotosByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const photos = await Photo.find({ category: category });
        if (category === 'Spring/Summer') {
            res.render('fashion/spring-summer', { photos });
        } else if (category === 'Fall/Winter') {
            res.render('fashion/fall-winter', { photos });
        } else {
            res.status(404).send('Category not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Get all photos
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.render('photos', { photos });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a specific photo
exports.getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) return res.status(404).send('Photo not found');
        res.render('photoDetail', { photo });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add a new photo
exports.createPhoto = async (req, res) => {
    const { url, description } = req.body;
    try {
        const newPhoto = new Photo({ url, description });
        await newPhoto.save();
        res.redirect('/photos');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a photo
exports.deletePhoto = async (req, res) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.redirect('/photos');
    } catch (err) {
        res.status(500).send(err.message);
    }
};