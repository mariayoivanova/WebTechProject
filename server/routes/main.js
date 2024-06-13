const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
 */

//Routes
router.get('', async (req, res) => {

   

    try {
        const locals = {
            titel: "Blog",
            description: "Blog usefull for everyone"
        }
        
        
        let perPage = 6;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ {$sort: { createdAd: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <=Math.ceil(count / perPage);


        res.render('index', {
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null

        });
    } catch (error){
        console.log(error);
    }
  
});


/*
function insertPostData(){
    Post.insertMany([
        {
            titel: "Building a blog",
            body: "This is the body text"
        }
    ])
}
*/
//insertPostData();

router.get('/about', (req, res) => {
    res.render('about');
});



module.exports = router;
