// const express = require('express');
import express, {Request, Response, NextFunction, RequestHandler} from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;


let users = [
  {
    id: 1,
    name:  'Gabriel'
  },
  {
    id: 2,
    name:  'Camilla'
  },
  {
    id: 3,
    name:  'Camiel'
  },
  {
    id: 4,
    name:  'Gabilla'
  },
];
//CREATE
app.post('/users', (req, res) =>{
  const newUser = {
    name: req.body.name,
    id: Date.now()
  };
  users.push(newUser)
  res.json(newUser)
})
//READ
app.get('/users', (req, res) =>{
  res.json(users)
})
//UPDATE
app.put('/users', (req, res) =>{
  const { id, name } = req.body;
  users = users.map((user) =>{
    if (user.id === id) {
      user.name = name
    }
    return user
  });
  res.json(users);
});

//DELETE
app.delete('/users', (req, res) =>{
  const { id } = req.body;
  
  users = users.filter(user => user.id !== id)
  res.json(users)
})

const isAuthorized : RequestHandler = (req : Request, res : Response, next : NextFunction) =>{
  const authHeader = req.headers.authorization
  
  if( authHeader === 'mysecretvalue') {
    next();
  } else{
    res.status(401);
    res.json({msg: 'no Access'})
  }
}

//GET one user
app.get('/users/:id', isAuthorized, (req, res) =>{
  const id = +req.params.id; //+ retorna um number
  const user = users.filter(user => user.id === id)[0]
  res.json(user)
})
//start
app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)

})