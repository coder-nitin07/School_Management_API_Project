const express = require('express');
const validateSchool = require('../middleware/schoolValidation');
const { createSchool, listSchools } = require('../controllers/schoolController');
const validateQueryLocation = require('../middleware/validateQueryLocation');
const { authenticate } = require('../middleware/authMIddleware');
const { authorizedRoles } = require('../middleware/roleMiddleware');
const schoolRouter = express.Router();

schoolRouter.post('/createSchool', authenticate, authorizedRoles('admin'), validateSchool, createSchool);
schoolRouter.get('/listSchools', validateQueryLocation, listSchools);

module.exports = schoolRouter;