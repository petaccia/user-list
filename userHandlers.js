const database = require("./database");
// const users =[
//   {
//     id : 1,
//     firstName:'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     city:'Paris',
//     language:'English'
//   },
//   {
//     id: 2,
//     firstName:'Valeriy',
//     lastName:'Appius',
//     email:'valeriy.appius@example.com',
//     city:'Moscow',
//     language:'Russian'
//   },
//   {
//     id: 3,
//     firstName:'Ralf',
//     lastName:'Geronimo',
//     email:'ralf.geronimo@example.com',
//     city:'New York',
//     language:'Italian'
//   },
//   {
//     id: 4,
//     firstName:'Maria',
//     lastName:'Iskandar',
//     email:'maria.iskandar@example.com',
//     city:'New York',
//     language:'German'
//   },
//   {
//     id: 5,
//     firstName:'Jane',
//     lastName:'Doe',
//     email:'jane.doe@example.com',
//     city:'London',
//     language:'English'
//   },
//   {
//     id: 6,
//     firstName:'Johanna',
//     lastName:'Martino',
//     email:'johanna.martino@example.com',
//     city:'Milan',
//     language:'Spanish'
//   },
  
// ];

// route getUsers
const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];
  if (req.query.city != null) {
    where.push({
      column: "city",

      value: req.query.city,

      operator: "=",
    });
  }

  if (req.query.language != null) {
    where.push({
      column: "language",

      value: req.query.language,

      operator: "=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,

        initialSql
      ),

      where.map(({ value }) => value)
    )

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
  const {firstname, lastname, email, city, language, hashedPassword} = req.body;

    database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language,hashedPassword) VALUES (?,?,?,?,?,?)",
      [firstname, lastname, email, city, language,hashedPassword]
      )
      .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error saving the user");
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const {email} = req.body; 

  database.query("select * FROM users where email = ?", [email])
  .then(([users]) => {
    if (users[0] != null) {
      req.user = users[0];

      next()
    } else {
      res.sendStatus(401);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("error retrieving data from database");
  });
}



// route updateUsers
const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const {firstName, lastName, email, city, language } = req.body;

  database
  .query(
    "update users setup firstName = ?, lastName=?, email= ?, city= ?, language= ? where id = ?",
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
  deleteUsers,
  getUserByEmailWithPasswordAndPassToNext
}








 
 
 
 