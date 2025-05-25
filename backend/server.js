const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

app.post('/api/posts', upload.single('photo'), (req, res) => {
    console.log("Post creation request received:", req.body);

    const { title, category, conditions, description, price, negotiable, location } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!title || !category || !conditions || !description || !price || !photo) {
        return res.json({ status: "error", message: "All fields are required" });
    }

    const insertSql = `
        INSERT INTO posts (title, photo, category, conditions, description, price, negotiable, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        insertSql,
        [title, photo, category, conditions, description, parseFloat(price), negotiable === 'true' ? 1 : 0, location],
        (err, result) => {
            if (err) {
                console.error("Query Error:", err);
                return res.json({ status: "error", message: "Database error while creating post" });
            }
            return res.json({ status: "success", message: "Post created successfully", postId: result.insertId });
        }
    );
});

app.get('/api/posts', (req, res) => {
    const sql = "SELECT * FROM posts ORDER BY created_at DESC";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching posts:", err);
            return res.json({ status: "error", message: "Database error" });
        }
        return res.json({ status: "success", data: data });
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
