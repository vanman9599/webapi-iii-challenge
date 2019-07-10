const Posts = require('./postDb.js');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error retrieving users'
        })
    }
});

router.get('/:id',async (req, res) => {
    try{
        const posts = await Posts.getById(req.params.id);
        if(posts){
            res.status(200).json(posts);
        }else{
            res.status(404).json({ message: "User not found"})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "error retrieving user"
        })
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const count = await Posts.remove(req.params.id);
        if(count >0){
            res.status(200).json({ message: 'The user has been deleted'});
        }else{
            res.status(404).json({ message: 'The user could not be found'})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error deleting user"
        })
    }
});

router.put('/:id', (req, res) => {
    try{
        const post = Posts.update(req.params.id, req.body);
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The user could not be found"
            })
        }
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "Error updating user"
        })
    }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;