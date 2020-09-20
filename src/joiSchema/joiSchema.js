/**
 * Joi Schemas of the routes
 */
const Joi = require('joi');

const schemas = {
  blogPOST: Joi.object({
    title: Joi.string().max(256).required(),
    content: Joi.string().max(10240).required(),
    year: Joi.number()
  }),
  blogLIST: Joi.object({
    page: Joi.number().min(1).required(),
    pageSize: Joi.number().min(5).max(100).required()
  }),
  blogDETAIL: Joi.object({
    id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).message('Invalid post Id') //validation for Mongo ObjectID
  })
};

module.exports = schemas;