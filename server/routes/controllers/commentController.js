const Comment = require('../models/commentModel');

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const newComment = new Comment({
            name: req.body.name,
            text: req.body.text
        });
        await newComment.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id, { text: req.body.text });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
