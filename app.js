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

// app.get('/api/users' , (req , res) => {
//   res.json(users).status(200);
// })

app.get('/api/users/:id', (req, res) => {
  const parsedUsersId = parseInt(req.params.id)
  const user = users.find((user) => user.id === parsedUsersId);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("Not found");
  }
  
});


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});





  