const express = require('express');
const router = express.Router();
const User = require('../models/User');//gets the folder with the users Schema

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.post('/', (req, res) => {
    let user = new User(req.body);

    user.save((err, user) => {
        err ? res.status(404).send(err) : res.status(201).json(user);
    });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if(user == null){res.status(404).send('User not found')}
            else {
            res.status(200).json(user)}
        })
        .catch(function(err){ 
            res.status(500).send(err, 'Internal Error Occured');
        });
    });

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.query)
        .then(user => {
            res.status(204).json(user)
        })
        .catch(function(err){
            res.status(500).send(err, 'User does not exist!')
        });
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndDelete(req.params.id)
        .then(user => {
            res.status(200).send(`User removed from DB!`);
        })
        .catch(err => console.log(err));
})

module.exports = router;