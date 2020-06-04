const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors');
const PORT = 3000;
const router = require('./routes/api')
//Initialize app
const app = express();

// const db = require ('./db')

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

app.use('/assets', express.static(path.resolve(__dirname, '..client/assets')));

mongoose.connect('mongodb://127.0.0.1:27017/greetingCards', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

app.use('/api', router);

//Home route
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
});

app.post('/', (req, res) => {
  
})

//starts server
app.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`)
});

module.exports = app;