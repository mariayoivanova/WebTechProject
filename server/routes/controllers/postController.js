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
        const perPage = 3; // Number of posts per page
        const page = parseInt(req.query.page) || 1; // Current page number (default: 1)

        const posts = await Post.find()
            .sort({ createdAt: -1 }) // Sort posts by createdAt descending
            .skip((page - 1) * perPage) // Skip posts that are before the current page
            .limit(perPage); // Limit the number of posts per page

        const count = await Post.countDocuments(); // Total number of posts

        // Calculate pagination values
        const hasNextPage = (page * perPage) < count; // Check if there's a next page
        const hasPrevPage = page > 1; // Check if there's a previous page
        const nextPage = hasNextPage ? page + 1 : null;
        const prevPage = hasPrevPage ? page - 1 : null;

        res.render('index', { 
            title: 'My Blog', 
            description: 'Blog useful for everyone', 
            posts: posts,
            currentPage: page,
            nextPage: nextPage, 
            prevPage: prevPage      
        });
    } catch (e) {
        res.status(500).send(e);
    }
};

// Read single post
exports.getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId); // Find post by ID in MongoDB
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('postDetail', {
            title: post.title,
            post: post
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching post');
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
