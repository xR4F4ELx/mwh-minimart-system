//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require("express");

//////////////////////////////////////////////////////
// CREATE APP
//////////////////////////////////////////////////////
const app = express();

//////////////////////////////////////////////////////
// USES
//////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("I am Alive!");
});

const mainRoutes = require("./routes/mainRoutes");

app.use("/api", mainRoutes);

//////////////////////////////////////////////////////
// SETUP STATIC FILES
//////////////////////////////////////////////////////
app.use("/", express.static('public'));

//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////
module.exports = app;