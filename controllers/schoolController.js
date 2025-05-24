const db = require("../config/db");
const { calculateDistance } = require("../utils/calculateDistance");

// Create a school
const createSchool = (req, res)=>{
    const { name, address, latitude, longitude } = req.body;

    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [ name, address, latitude, longitude ], (err, result)=>{
        if(err){
            console.log("Error inserting school in DB", err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ message: 'School added successfully' });
    });
};

// Get School Distance
const listSchools = (req, res)=>{
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const sql = 'SELECT * FROM schools';

    db.query(sql, (err, result)=>{
        if(err){
            console.log("Error while fetching school data from DB", err);
            return res.status(500).json({ message: 'Database error' });
        }

        const schoolsWithDistance = result.map(school =>{
            console.log("distance", calculateDistance)
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);

            return { ...school, distance: distance.toFixed(2) };
        });

        schoolsWithDistance.sort((a, b)=> a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    });
};

module.exports = { createSchool, listSchools };