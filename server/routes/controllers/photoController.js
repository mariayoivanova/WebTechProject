const Photo = require('../models/Photo');
const path = require('path');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Display all photos for spring/summer
exports.getAllSpringSummerPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({ category: 'Spring/Summer' });
        res.render('fashion/spring-summer', { photos });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Display all photos for fall/winter
exports.getAllFallWinterPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({ category: 'Fall/Winter' });
        res.render('fashion/fall-winter', { photos });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Display form to add a new photo
exports.getAddPhotoForm = (req, res) => {
    res.render('add-photo');
};

// Add a new photo
exports.addPhoto = [
    upload.single('image'),
    async (req, res) => {
        const { title, category, url } = req.body;
        const imagePath = req.file ? req.file.path : '';  // Assuming imagePath is where you store the uploaded file path

        const newPhoto = new Photo({
            title: title,
            category: category,
            url: url
        });

        try {
            await newPhoto.save();
            if (category === 'Spring/Summer') {
                res.redirect('/spring-summer');
            } else if (category === 'Fall/Winter') {
                res.redirect('/fall-winter');
            } else {
                res.status(400).send('Invalid category');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
];

// Display form to edit a photo
exports.getEditPhotoForm = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        res.render('edit-photo', { photo });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a photo
exports.updatePhoto = [
    upload.single('image'),
    async (req, res) => {
        const { title, category, url } = req.body;

        try {
            const photo = await Photo.findById(req.params.id);
            photo.title = title;
            photo.category = category;
            photo.url = url;

            if (req.file) {
                photo.imagePath = req.file.path;
            }

            await photo.save();
            if (category === 'Spring/Summer') {
                res.redirect('/spring-summer');
            } else if (category === 'Fall/Winter') {
                res.redirect('/fall-winter');
            } else {
                res.status(400).send('Invalid category');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
];

// Delete a photo
exports.deletePhoto = async (req, res) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.redirect(req.headers.referer); // Redirect back to the referring page
    } catch (error) {
        res.status(500).send(error);
    }
};
