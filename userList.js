const database = require("./database");
const users =[
  {
    id : 1,
    firstName:'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    city:'Paris',
    language:'English'
  },
  {
    id: 2,
    firstName:'Valeriy',
    lastName:'Appius',
    email:'valeriy.appius@example.com',
    city:'Moscow',
    language:'Russian'
  },
  {
    id: 3,
    firstName:'Ralf',
    lastName:'Geronimo',
    email:'ralf.geronimo@example.com',
    city:'New York',
    language:'Italian'
  },
  {
    id: 4,
    firstName:'Maria',
    lastName:'Iskandar',
    email:'maria.iskandar@example.com',
    city:'New York',
    language:'German'
  },
  {
    id: 5,
    firstName:'Jane',
    lastName:'Doe',
    email:'jane.doe@example.com',
    city:'London',
    language:'English'
  },
  {
    id: 6,
    firstName:'Johanna',
    lastName:'Martino',
    email:'johanna.martino@example.com',
    city:'Milan',
    language:'Spanish'
  },
  
];
console.log(users);
// route getUsers
const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

//route getUserById
function getUserById(req, res) {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?"[id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error retrieving data from database");
    });
}

//route postUsers
const postUsers = (req, res) => {
  const {firstName, lastName, email, city, language } = req.body;

    database
    .query(
      "INSERT INTO movies(firstName, lastName, email, city, language) VALUES (?,?,?,?,?)",
      [firstName, lastName, email, city, language]
      )
      .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error saving the user");
    });
};


// route updateUsers
const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const {firstName, lastName, email, city, language } = req.body;

  database
  .query(
    "update users setup title = ?, director =?, year = ?, color = ?, duration = ? where id = ?",
    [firstName, lastName, email, city, language, id ]
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
      res.status(500).send("error editing the user");
    });
 };

 //route deleteUsers
 const deleteUsers = (req, res) => {
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
  getUsers,
  getUserById,
  postUsers,
  updateUsers,
  deleteUsers
}








 
 
 
 