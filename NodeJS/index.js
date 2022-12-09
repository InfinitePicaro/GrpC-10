const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors')


const customCallBack = (result,err) =>  { 
  if (err) {
    res.status(400).send("Error!");
  } else {
    res.json(result);
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

dbo.connectToServer();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

//celui-ci après la déclaration de la variable app
app.use(cors())


//----------READ----------
app.get("/pokemon/list", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemon")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
});


//----------INSERT/CREATE----------
app.post('/pokemon/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokemon")
    .insertOne({body})
    .then(customCallBack);
  res.json(body);
});

//----------UPDATE----------
app.post('/pokemon/update', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const option = { upsert: true};
  const filter = { name:req.body.pokToUpdate };
  const body = {
    $set: {
      name: req.body.pokToUpdate,
      img: req.body.img,
    },
  };
  console.log('Got body:', body);
  dbConnect
    .collection("pokemon")
    .updateOne(filter,body, option) 
    .then(callBackCustom)
  res.json(body);
});

//----------DELETE----------
app.delete('/pokemon/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemon")
    .deleteOne(body) 
    .then(callBackCustom)
  res.json(body);
});





//---------------------------
//----------POKEDEX----------
//---------------------------


//----------INSERT/CREATE----------
app.post('/pokedex/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokedex")
    .insertOne({body})
    .then(customCallBack);
  res.json(body);
});



//----------READ----------
app.get("/pokedex/list", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokedex")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
});

//----------DELETE----------
app.delete('/pokedex/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokedex")
    .deleteOne(body) 
    .then(customCallBack)
  res.json(body);
});




//---------------------------
//----------TYPES------------
//---------------------------


//----------READ----------
app.get("/type/list", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("type")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
});


//----------INSERT/CREATE----------
app.post('/type/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("type")
    .insertOne({body})
    .then(customCallBack);
  res.json(body);
});

//----------UPDATE----------
app.post('/type/update', jsonParser, (req, res) => {
  const filter = { name:req.body.typeToUpdate };
  const body = {
    $set: {
      name: req.body.typeToUpdate,
      img: req.body.img,
    },
  };
  console.log('Got body:', body);
  //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
  const dbConnect = dbo.getDb();
  const option = { upsert: true};
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("type")
    .updateOne(filter,body, option) 
    .then(customCallBack)
  res.json(body);
});

//----------DELETE----------
app.delete('/type/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("type")
    .deleteOne(body) 
    .then(customCallBack)
  res.json(body);
});