const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be more than 2 characters and less than 30';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username cannot be empty';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be empty';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot me empty';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password needs to be at least 6 characters';
  }

  // if (Validator.isEmpty(data.password2)) {
  //   errors.password2 = 'Re-type password';
  // } //TODO: validate empty password2 field

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};