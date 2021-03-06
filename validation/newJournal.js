
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateNewJournal(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Journal name can\'t be blank';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};