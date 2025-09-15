const env = require('dotenv').config();
const express = require('express'); 
const dbConfigaration = require('./configurations/dbConfig');
const app = express();
const routes = require('./routes');



app.use(express.json());  // json parser


dbConfigaration();  // connect to database

 

app.use('/' , routes)



// start server
app.listen(8080, () => {
    console.log('Server started on port 8080');
});