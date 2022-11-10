require("dotenv").config();
const { query } = require("express");
const express = require("express");
const app = express();

const port = process.env.APP_PORT ?? 3000;

const users = [
  { id: 1, name: 'Nicolas', speciality: 'Games'},
  { id: 2, name: 'Guillaume', speciality: 'Books'},
  { id: 3, name: 'Roger', speciality: 'Films'},
  { id: 4, name: 'Léo', speciality: 'Games'},
  { id: 5, name: 'Adam', speciality: 'Games'},
  { id: 6, name: 'Robin', speciality: 'Books'},
  { id: 7, name: 'Laure', speciality: 'Sports'},
  { id: 8, name: 'Sarah', speciality: 'Books'},
];


const newId = 9;

app.get('/api/users' , (req, res) => {
  res.send(users)
})

app.use(express.json());
app.post('/api/users' , (req , res) => {
  const{ name, speciality} = req.body;
  const newUser =  {id : newId, name, speciality };
  if ( name && speciality){
    users.push(newUser);
    res.status(201).send(newUser);
  }else{
    res.status(400).send('error durring addind user');
  }
});


 






app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});





  