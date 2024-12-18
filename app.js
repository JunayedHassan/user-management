const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const {MAX_JSON_SIZE, REQUEST_TIME, REQUEST_NUMBER, DATABASE} = require('./src/config/config');


// necessary modules
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');

const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');
const path = require("path");




//middlewares
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({limit: MAX_JSON_SIZE, extended: true}));


const limiter= rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter)

app.set('etag', false);
app.use("/api/",router)

// connect mongodb
mongoose.connect(DATABASE).then((res)=>{
    console.log("mongodbd connected")
}).catch(err=>{
    console.log(err)
});


module.exports =app;