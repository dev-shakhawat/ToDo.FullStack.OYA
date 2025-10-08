const env = require("dotenv").config();
const express = require("express");
const dbConfigaration = require("./configurations/dbConfig");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');






app.use(express.json()); // json parser
app.use("/uploads" , express.static("uploads"))
app.use(express.urlencoded({ extended: true }))

dbConfigaration(); // connect to database

// cors policy unblock
app.use(
  cors({
    origin: ["http://localhost:5173" ],
    credentials: true,
  })
);


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ToDo App API",
      version: "1.0.0",
      description: "A simple ToDo App API",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

 


app.use("/", routes); // all routes/api's likned here

// start server
app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server started on port 8080");
});
