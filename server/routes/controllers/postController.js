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
        const perPage = 5; // Number of posts per page
        const page = parseInt(req.query.page) || 1; // Current page number (default: 1)

        const posts = await Post.find()
            .sort({ createdAt: -1 }) // Sort posts by createdAt descending
            .skip((page - 1) * perPage) // Skip posts that are before the current page
            .limit(perPage); // Limit the number of posts per page

        const count = await Post.countDocuments(); // Total number of posts

        // Calculate pagination values
        const hasNextPage = (page * perPage) < count; // Check if there's a next page
        const nextPage = hasNextPage ? page + 1 : null; // Next page number

        res.render('index', { 
            title: 'My Blog', 
            description: 'Blog useful for everyone', 
            posts: posts,
            current: page,
            nextPage: nextPage // Falls du die Seitenpaginierung implementiert hast
        })
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getPost = async (req, res) => {
    try {
        res.render('index', { 
            title: 'My Blog', 
            description: 'Blog useful for everyone', 
            posts: posts, // Die Daten als "posts" übergeben
            nextPage: null // Falls du die Seitenpaginierung implementiert hast
        });
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
