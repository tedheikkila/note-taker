// Server runs note-taker app

// require statements 
const path = require('path');
const express = require('express');
const app = express();
const database = require('./db/db.json');

// sets initial port to environment or 3000
const PORT = process.env.PORT || 3000;

// sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// incorporate static assets (htmls, css, js)
app.use(express.static('public'))

// routes: gives server a "map" of how to respond when users visits URLs
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// listener: "starts" our server (on 3000 or specified env PORT)
app.listen(PORT, () => {
  console.log(`app listening on PORT: ${PORT}`);
});