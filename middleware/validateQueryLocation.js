const Joi = require('joi');

const locationSchema = Joi.object({
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});

const validateQueryLocation = (req, res, next)=>{
    const { error } = locationSchema.validate(req.query);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = validateQueryLocation;