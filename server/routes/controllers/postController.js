const Post = require('../models/Post');

// Create
exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).send(post);
    } catch (e) {
        res.status(400).send(e);
    }
};

// Read
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render('index', { title: 'My Blog', description: 'Blog useful for everyone', posts });
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Update
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (e) {
        res.status(400).send(e);
    }
};

// Delete
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (e) {
        res.status(500).send(e);
    }
};
