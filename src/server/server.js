const data = require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const boardsRoute = require('./routes/boards');
const userRoute = require('./routes/user');

app.use('/boards', boardsRoute);
app.use('/user', userRoute);

//const uri = "mongodb+srv://eminem1999:eminem1999@learning-cluster.ukzy6.mongodb.net/trello?retryWrites=true&w=majority";
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + process.env.DB_DATABASE + "?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true  }, () => {
	console.log("Connected to DB");
	console.log("Connection status: " + mongoose.connection.readyState);
});

app.listen(5000);