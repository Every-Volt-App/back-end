//import express
const express = require('express');
// instantiate express
const app = express();
//import middleware
const cors = require('cors')
const morgan = require('morgan')
const locationController = require('./controllers/chargers')

app.use(cors()) 
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(locationController)

// create a test router
app.get('/', (req, res) => {
    res.send('hello world!');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

