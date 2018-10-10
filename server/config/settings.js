require('dotenv').config('./env');

module.exports = {
    'secret': process.env.SES_ACCESS_KEY_ID
  };