const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

//morgan is logger- automatically log incoming request
app.use(morgan('common'));

// use to hide response headers - make is seccure from hackers
app.use(helmet());

// only accept the incoming request form defind headers
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.get('/', (req, res)=>{
    res.json({
        message: 'Hello World!',
    });
});

// not found middleware
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// error handling middleware 
//must have 4 parameters
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'lost' : error.stack,
  });
});

const port = process.env.PORT || 1337;
app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`);
});