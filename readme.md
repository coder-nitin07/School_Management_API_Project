## Project: School Management API Project

## Overview:
    A RESTful API built using Node.js, Express.js, and MySQL to manage school data. The API allows adding schools and listing them sorted by proximity to the user's location. Includes authentication, role-based access, input validation, and proper error handling.

## Features:
    - Add new school (Admin only)
    - List schools sorted by distance (Haversine formula)
    - Input validation using Joi
    - JWT authentication and role-based access control
    - Centralized error handling with meaningful status codes

## Authentication & Authorization:
    - User signup and login with JWT
    - Role-based access (Admin/User)
    - Only Admin can add a school
    - Listing schools is accessible to all authenticated users


## Technologies:
    - Node.js
    - Express.js
    - MySQL
    - Joi
    - JWT

## Setup:
    - npm install
    - npm start


## Project Links:
    - GitHub Repository: https://github.com/coder-nitin07/School_Management_API_Project.git
    - Postman Collection: https://drive.google.com/file/d/1JSXtaQH4LV36igbL4ZB3HX6a3cev-OHK/view?usp=sharing