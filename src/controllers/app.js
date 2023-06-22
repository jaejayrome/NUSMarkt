const express = require('express');
const { generateImage } = require('./aiConfig.js');

// app setup
const app = express();
app.listen(4000, () => console.log('listening to requests on port 4000'));

// middleware
app.use(express.json());
app.use(express.static('public'));

// routes
app.post('/openai/image', generateImage);

// Allow CORS (Cross-Origin Resource Sharing) for the frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
