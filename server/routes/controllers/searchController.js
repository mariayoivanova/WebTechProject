const Post = require('../models/Post');

const searchController = async (req, res) => {
    try {
      const locals = {
        title: "Seach",
        description: "Blog"
      };
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
       // Query to find posts matching search term
       const posts = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      // Render search results view
      res.render("search", {
        posts,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
      // Handle error gracefully
      res.status(500).send("Error processing search");
    }
  };
  
  // Export the controller function to be used in your routes
  module.exports = searchController;