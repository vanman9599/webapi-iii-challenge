const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/users', userRouter)
// server.use('api/posts', postRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});
 
//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method} URL: ${req.url} date: ${Date.now()}`)
};

module.exports = server;
