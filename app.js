require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.APP_PORT ?? 3000;


app.use(express.json());
// route Movies
const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", movieHandlers.postMovie)

app.put("/api/movies/:id", movieHandlers.updateMovie);
 app.delete("/api/movies/:id", movieHandlers.deleteMovies)

//route users
const userList = require("./userList");

app.get("/api/users", userList.getUsers);
app.get("/api/users/:id", userList.getUserById);

app.post("/api/users", userList.postUsers);

app.put("/api/users/:id", userList.updateUsers);

app.delete("/api/users/:id", userList.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
