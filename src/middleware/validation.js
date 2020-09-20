/**
 * Validation middleware to validate call / routes
 */
const Joi = require('joi');

/**
 * 
 * @param schema joiSchema which need to validate
 * @param property request property which need to validate (body, params, query)
 */
const middleware = (schema, property) => {
  return (req, res, next) => {

    const { error } = schema.validate(req[property]);

    const valid = error == null;
    if (valid) {
      next();
    } else {
      
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      console.log("error", message);

      res.status(422).json({
        error: message 
      })
    }
  }
}

module.exports = middleware;