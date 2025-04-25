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

// Login route
app.post('/login', (req, res) => {
    console.log("Login request received:", req.body);

    const { fname, username, password } = req.body;

    const sql = "SELECT * FROM login WHERE fname = ? AND username = ? AND password = ?";
    db.query(sql, [fname, username, password], (err, data) => {
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

// Register route
app.post('/register', (req, res) => {
    console.log("Registration request received:", req.body);

    const { fname, username, password } = req.body;

    const checkSql = "SELECT * FROM login WHERE username = ?";
    db.query(checkSql, [username], (err, data) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({ status: "error", message: "Database error" });
        }

        if (data.length > 0) {
            return res.json({ status: "exists", message: "User already exists" });
        }

        const insertSql = "INSERT INTO login (fname, username, password) VALUES (?, ?, ?)";
        db.query(insertSql, [fname, username, password], (err, result) => {
            if (err) {
                console.error("Query Error:", err);
                return res.json({ status: "error", message: "Failed to register user" });
            }
            return res.json({ status: "success", message: "User registered successfully" });
        });
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
