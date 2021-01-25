// npm install --save express body-parser mysql nodemon

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db'
});

connection.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected')
        app.listen(3000)
    }
})
