const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let db;

function handleDbConnection() {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'phpmyadmin',
        password: 'Rijan@123',
        database: 'Crud'
    });

    db.connect(err => {
        if (err) {
            console.error('Error connecting to DB:', err);
            setTimeout(handleDbConnection, 2000); 
        } else {
            console.log('Connected to MySQL database.');
        }
    });

    db.on('error', err => {
        console.error('DB Error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDbConnection();
        } else {
            throw err;
        }
    });
}

handleDbConnection(); 

app.post('/login', (req, res) => {
    console.log("Login request received:", req.body);

    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({ status: "error", message: "Database error" });
        }
        if (data.length > 0) {
            return res.json({ status: "success", message: "Login successful" });
        } else {
            return res.json({ status: "no_record", message: "No matching user found" });
        }
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});

//this is wil be the register page
app.post('/register', (req, res) => {
    console.log("Registration successful", req.body);

    const {username, password} = req.body;

    const checkSql = "SELECT * FROM login WHERE username = ?";
    db.query(checkSql, [username], (err, data) => {
        if(err){
            console.error({status: "ERROR", message: "Database error"});
            return res.json({status:"ERROR", message: "User already exists"});
        }

        const insertSql = "INSERT INTO login (username, password) VALUES (?, ?)";
        db.query(insertSql, [username, password], (err, result) => {
            if(err){
                console.error("Query Error:", err);
                return res.json({status: "error", message: "database error"});
            }
            return res.json({status:"success", message:"user registered."});
        });
    });
});
