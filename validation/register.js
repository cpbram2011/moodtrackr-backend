const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Name must be more than 2 characters and less than 30';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Do not forget your username!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'DO NOT LEAVE THE EMAIL FIELD EMPTY!';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'People who misspell their email get 10 shocks';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Do not forget your password!';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password needs to be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Do not forget to confirm your password!';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match.  Are you sure you\'re not crazy?';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};