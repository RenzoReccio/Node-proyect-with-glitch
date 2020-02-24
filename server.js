// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

//Connecting database
mongoose.connect("YOUR_MONGODB_URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Data Structure
var restauranteSchema = new Schema({
  name: { required: true, type: String },
  tipo: String,
  platos: [String]
});

const Restaurante = mongoose.model("Restaurante", restauranteSchema);

//Functions
//to Save
function addRestaurante(name, tipo, platos) {
  var newRestaurante = new Restaurante({
    name: name,
    tipo: tipo,
    platos: platos
  });
  console.log(newRestaurante);
  newRestaurante.save((err, data) => {
    if (err) {
      return err;
    }
  });
  return "u made it boi!";
}

//to List
function listRestaurants(res) {
  Restaurante.find({}).exec((err, data) => {
    if (err) console.error(err);
    var jsonData = JSON.parse(JSON.stringify(data));
    res.json({ response: jsonData });
  });
}

//to Search
function searchRestaurantsbyTipo(res, tipo) {
  Restaurante.find({ tipo: tipo }, (err, data) => {
    if (err) console.log(err);
    var jsonData = JSON.parse(JSON.stringify(data));
    res.json({ response: jsonData });
  });
}

//to Remove
function removeRestaurantbyId(res, id) {
  Restaurante.findByIdAndRemove({ _id: id }, (err, data) => {
    if (err) console.error(err);
    var jsonData = JSON.parse(JSON.stringify(data));
    res.json({ response: jsonData });
  });
}

//requests ;)
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/api/save", (req, res) => {
  var response = addRestaurante(
    req.body.name,
    req.body.tipo,
    req.body["platos[]"]
  );
  res.json({ result: response });
});

app.post("/api/list", (req, res) => {
  listRestaurants(res);
});

app.post("/api/search", (req, res) => {
  searchRestaurantsbyTipo(res, req.body.tipo);
});

app.post("/api/remove", (req, res) => {
  removeRestaurantbyId(res, req.body.id);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
