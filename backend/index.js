const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/db');
const { readdirSync } = require('fs');
const cookieParser = require('cookie-parser');
// const userSigninorNot = require('./middlewares/Auth');
const { authenticateToken } = require('./utilites')
require('dotenv').config();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(userSigninorNot("token"));
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start server
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
  });
};

server();
