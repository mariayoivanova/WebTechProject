const { create } = require('connect-mongo');
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
    updatedt:{
        type : Date,
        default: Date.now
    }
})
//test
module.exports = mongoose.model('Post',PostSchema);