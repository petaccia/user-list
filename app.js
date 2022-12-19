require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.APP_PORT || 3000;




app.use(express.json());
app.use(verifyToken);
// route Movies
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const {hashPassword, verifyPassword, verifyToken} = require('./auth.js');

app.get("/api/movies",  movieHandlers.getMovies);
app.get("/api/movies/:id",  movieHandlers.getMovieById);

app.post("/api/movies", verifyToken, movieHandlers.postMovie)

app.put("/api/movies/:id", verifyToken, movieHandlers.updateMovie);
 app.delete("/api/movies/:id", verifyToken, movieHandlers.deleteMovies)

//route users

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users",hashPassword, userHandlers.postUsers);

app.put("/api/users/:id", verifyToken, userHandlers.updateUsers);

app.delete("/api/users/:id", verifyToken, userHandlers.deleteUsers);

// route login


app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
