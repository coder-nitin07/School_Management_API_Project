const db = require("../config/db");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

// Signup API
const signup = (req, res) => {
    const { name, email, password, role } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.log("Database error", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password inside the callback
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log("Hashing error", err);
                return res.status(500).json({ message: "Internal error" });
            }

            const query = role
                ? "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
                : "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            const values = role
                ? [name, email, hashedPassword, role]
                : [name, email, hashedPassword];

            db.query(query, values, (err, result) => {
                if (err) {
                    console.log("Insert error", err);
                    return res.status(500).json({ message: "Database error" });
                }

                    res.status(201).json({ message: "User registered successfully" });
                }
            );
        });
    });
};


// login API
const login = (req, res)=>{
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email =?', [ email ], async (err, result)=>{
        if (err){
            return res.status(500).json({ message: 'Database error' });
        }

        if(result.length === 0){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.id, user.role);
        res.status(200).json({ message: 'User login successfully', token });
    });
};

module.exports = { signup, login };