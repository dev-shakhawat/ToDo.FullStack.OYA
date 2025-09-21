const env = require("dotenv").config();
const express = require("express");
const dbConfigaration = require("./configurations/dbConfig");
const app = express();
const routes = require("./routes");
const cors = require("cors");

app.use(express.json()); // json parser
app.use(express.urlencoded({ extended: true }))

dbConfigaration(); // connect to database

// cors policy unblock
app.use(
  cors({
    origin: ["http://localhost:5173" ],
    credentials: true,
  })
);
app.use("/", routes); // all routes/api's likned here

// start server
app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server started on port 8080");
});
