const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
});

app.post('/login', (req, res) => {
    console.log("Login request received:", req.body);

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
 

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("DB Error:", err);
            return res.json({ status: "Login failed" });
        }else{
            return res.json("no record")
        }

    });
});



app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
