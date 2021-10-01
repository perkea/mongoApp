// require our dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');


// initialize the express app
const app = express();
// configure server settings
require('dotenv').config();
// establish a connection to MongoDB

// This is DanielJS's DB Connection String
const MONGODB_URI = process.env.MONGODB_URI;

// client connection method
mongoose.connect(MONGODB_URI);
// Use this if issues with mongodb
// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
  


// connection instance shortcut variable
const db = mongoose.connection;

///////////// mongoose playground ///////////// 

// Create a model instance -> Model.create()
/*
Tweet.create({title: 'second tweet', body: 'goodbye world', author: 'daniel'}, 
function(err, document) {
    console.log(document)
});
// Index your documents -> Model.find()
Tweet.find({}, function(err, documents) {
    console.log(documents);
});
*/


///////////// mongoose playground ///////////// 

db.on('connected', () => console.log(`Connected to the ${db.name} database on port:${db.port}`));
db.on('error', () => console.log(`Uh Oh! Mongodb had and error ${error.message}`));
db.on("disconnected", () => console.log("mongod disconnected"))



// mount middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!")
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`); 
})