require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const dbConfigaration = require("./configurations/dbConfig");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { rateLimit } = require('express-rate-limit') 





app.use(express.json()); // json parser
app.use(cookieParser()); // cookie parser
app.use("/uploads" , express.static("uploads"))
app.use(express.urlencoded({ extended: true }))


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true , // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers. 
  message: { error: 'Too many requests, please try again after 15 minutes later.' },
})



dbConfigaration(); // connect to database

// cors policy unblock
app.use(
  cors({
    origin: ["http://localhost:5173" ],
    credentials: true,
  })
);


app.use(limiter)

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
