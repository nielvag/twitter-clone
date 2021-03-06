require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

app.use((req, res, next) => {
	req.io = io;

	return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));
require('./controllers/AuthController')(app);

server.listen(process.env.PORT || 3000, () => {
	console.log(':) Server started on port 3000');
});