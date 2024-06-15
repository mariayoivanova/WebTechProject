//const { create } = require('mongoose');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const PostSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema);