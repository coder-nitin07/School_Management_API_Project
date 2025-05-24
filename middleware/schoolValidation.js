const Joi = require('joi');

const schoolSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});

const validateSchool = (req, res, next)=>{
    const { error } = schoolSchema.validate(req.body);

    if(error){
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = validateSchool;