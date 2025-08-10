const Joi = require("joi");

const addSchoolSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  address: Joi.string().trim().min(1).max(500).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

const listSchoolsSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  limit: Joi.number().integer().min(1).max(200).optional(),
  radiusKm: Joi.number().min(0).optional(),
});

module.exports = { addSchoolSchema, listSchoolsSchema };
