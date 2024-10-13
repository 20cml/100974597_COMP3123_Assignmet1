const express = require('express');
const empRouter = require('./router/employees');
const userRouter = require('./router/users');
const mongoose = require("mongoose");
const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const app = express();
const SERVER_PORT = process.env.PORT || 3003;

const DB_CONNECTION_STRING = "mongodb+srv://leecamila20:LCtDwgIpW8RSB27S@cluster0.81oph.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error:", err);
});

// middleware to parse incoming form data (est fields)
app.use(express.json());  
app.use(express.urlencoded({extended: true}));

const loggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
};

//apply the middleware to all requests 
app.use(loggerMiddleware);

app.use('/u', userRouter); 
app.use('/e', empRouter);

//error end point
// http://localhost:3003/error
//app.get('/error', (req, res) => {
//    throw new Error('This is a forced error');
//    res.send('Welcome to Express error handling');
//})

//error handling middleware
app.use(errorHandlerMiddleware);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
