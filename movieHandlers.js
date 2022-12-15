const database = require("./database");
const movies = [
{
  id: 1,
  title: "Citizen Kane",
  director: "Orson Wells",
  year: "1941",
  colors: false,
  duration: 120,
},
{
  id: 2,
  title: "The Godfather",
  director: "Francis Ford Coppola",
  year: "1972",
  colors: true,
  duration: 180,
},
{
  id: 3,
  title: "Pulp Fiction",
  director: "Quentin Tarantino",
  year: "1994",
  color: true,
  duration: 180,
},
];


//route getMovies
const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);
  }

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
// route getMovieById
const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    
  
  database
  .query("select * from movies where id = ?" [id])
  .then(([movies]) => {
    if (movies[0] != null) {
      res.json(movies[0]);
    }else{
      res.status(404).send("not found");
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("error retrieving data from database");
  });
};

// route postMovies
const postMovie = (req, res) => {
  const {title,  director, year, color, duration } = req.body;

    database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?,?,?,?,?)",
      [title, director, year, color, duration]
      )
      .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error saving the movie");
    });
};

// route updateMovies
 const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const {title, director, year, color, duration } = req.body;

  database
  .query(
    "update movies set title = ?, director =?, year = ?, color = ?, duration = ? where id = ?",
    [title, director, year, color, duration, id]
  )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('not found');
      }else{
        res.sendStatus(204);
      }
    })    
    .catch((err) => {
      console.error(err)
      res.status(500).send("error editing the movie");
    })
 };
// route deleteMovies;
 const deleteMovies = (req, res) => {
  const id = parseInt(req.params.id);
  database.query("delete fom movies where id = ?", [id])
  .then (([result]) => {
    if (result.affectedRows ===0) {
      res.status(404).send('not found');
      }else{
        res.sendStatus(204);
      }
  })
 };






module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovies
};
