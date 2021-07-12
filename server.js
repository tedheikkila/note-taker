// dependencies: npm packages to give server functionality

const express = require('express');

// tells node that we are creating an "express" server
const app = express();

// sets an initial port to environment or 8080; use this later in our listener
const PORT = process.env.PORT || 8080;

// sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes: gives server a "map" of how to respond when users visits URLs

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// listener: "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
