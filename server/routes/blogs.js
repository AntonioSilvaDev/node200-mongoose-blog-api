const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            blogs ? res.status(200).send(blogs) : res.status(404).send(err);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where('featured').equals('true')
        .then((blogs) => {
            blogs ? res.status(200).json(blogs) : res.status(404).send(err);
        })
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            blog ? res.status(200).json(blog) : res.status(404).send('Blog not found!');
        })
        .catch(function(err) {
            console.log('err', err);
            res.status(404).send('Internal Error Occured, Cannot find Blog')
        });
    });

router.post('/', (req, res) => {
    let dbUser = null;
    User
        .findById(req.body.author)
        .then(user => {
            dbUser = user;

            const newBlog = new Blog(req.body);
            user._id = newBlog.author;

            return newBlog.save();
        })
        .then(blog => {
            // Push the saved blog to the array of blogs associated with the User
            dbUser.blogs.push(blog);

            // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
            dbUser.save().then(() => res.status(201).json(blog));
        });
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body)
        .then(blog => {
            res.status(204).send(blog)
        })
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndDelete(req.params.id)
        .then(blog => {
            res.status(200).send(blog)
        })
        .catch(err => console.log(err));
});

module.exports = router;