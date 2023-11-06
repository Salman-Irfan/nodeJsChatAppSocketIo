const express = require('express');
const cors = require('cors');
const connectToMongodb = require('./config/mongoDb');
const dotenv = require('dotenv');

dotenv.config()

connectToMongodb()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());


const PORT = process.env.PORT || 5000;

// home route
app.get('/', (req, res) => {
    res.send('Hello World')
});

// avaiable routes
app.use('/', require('./routes/index'))

app.listen(PORT, ()=> {
    console.log(`node js chat app server is listening on port http://localhost:${PORT}`)
});