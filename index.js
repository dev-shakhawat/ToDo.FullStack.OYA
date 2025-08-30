const express = require('express');
const register = require('./controllers/auth/register');
const login = require('./controllers/auth/login');
const app = express();



app.use(express.json());  // json parser



app.post('/registration', register);  // register route

app.post('/login' , login)  // login route






// start server
app.listen(8080, () => {
    console.log('Server started on port 8080');
});