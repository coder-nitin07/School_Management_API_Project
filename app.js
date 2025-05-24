const express = require('express');
const connection = require('./config/db');
const schoolRouter = require('./routes/schoolRoutes');
const { authRouter } = require('./routes/authRoutes');
const app = express();

app.use(express.json());

// DB Connection
connection;

// Routes
app.use('/auth', authRouter);
app.use('/school', schoolRouter);

app.use('/', (req, res)=>{
    res.send('This is my School Management API Project with MySQL Database.');
});

app.listen(3000, ()=>{
    console.log("Server is listeing on 0003")
});