const express = require('express');
const Users = require('./userDb.js');
const router = express.Router();


router.use((req, res, next) => {
    console.log('users Router!');
    next();
  })

router.post('/', async (req, res) => {
    try{
        const user = await Users.insert(req.body);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error adding user"})
    }
    
});

router.post('/:id/posts', async (req, res) => {
    
    
});

router.get('/', async (req, res) => {
   try{
        const users = await Users.get();
        if(users){
            res.status(200).json(users);
        } else{
            res.status(404).json({ message: "Users not found"});
        } 
   }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error retrieving users'})
   }
    
});

router.get('/:id', validateUserId, async (req, res) => {
    try{
        const user = await Users.getById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({ message: "User not found"});
        }
    }catch(err){
        res.status(500).json({ message: 'Error retriving the user'});
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    try{
        const posts = Users.getUserPosts(req.params.id);
        if(posts){
            res.status(200).json(posts);
        } else{
            res.status(404).json({ message: "posts not found"});
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error retrieving posts"
        })
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try{
        const count = await Users.remove(req.params.id);
        if(count>0){
            res.status(200).json({ message: 'THe user has been deleted' })
        }else{
            res.status(404).json({ message: "The user could not be found" })
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error removing user" })
    }
});

router.put('/:id', validateUserId, async (req, res) => {
    try{
        const user = await Users.update(req.params.id, req.params.body)
        if(user===1){
            res.status(200).json(user);
        } else{
            res.status(404).json({ message: "The user could not be updated"})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error updating user" })
    }
});

//custom middleware

function validateUserId(req, res, next) {
  const user = await Users.getById(req.params.id);
  if(user){
    next();
  }else{
    res.status(400).json({ message: "Invalid user id" });
  }
};

function validateUser(req, res, next) {
    if(!req.body){
        res.status(400).json({ message: "missing user data"})
    }else if(!req.body.name){
        res.status(400).json({ message: "missing required name field"})
    }else{
        next();
    }
};

function validatePost(req, res, next) {
    if(!req.body){
        res.status(400).json({ message: "missing post data"});
    }else if(!req.body.text){
        res.status(400).json({ messageg: "meissing required text field"})
    }else{
        next();
    }
};

module.exports = router;
