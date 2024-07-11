const Comment = require('../models/commentModel');   // Korrigierter Pfad

exports.createComment = async (req, res) => {
    try {
        const { name, text } = req.body;
        if (!name || !text) {
            return res.status(400).json({ success: false, message: 'Name und Text sind erforderlich' });
        }
        const newComment = new Comment({ name, text });
        await newComment.save();
        res.status(201).json({ success: true, comment: newComment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Kommentar konnte nicht erstellt werden' });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Kommentare konnten nicht abgerufen werden' });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { text } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { text }, { new: true });
        res.status(200).json({ success: true, comment: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Kommentar konnte nicht aktualisiert werden' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Kommentar konnte nicht gelöscht werden' });
    }
};
