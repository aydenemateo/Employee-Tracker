const express = require ('express');
const mysql = require ('mysql2');

const PORT = 3001
const app = express();

app.use (express.urlencoded ({ extended: false }));
app.use (express.json());

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employee_db'
    },
    console.log (`Connected to Employee Database`)
);