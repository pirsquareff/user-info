//  config.js
//
//  Simple application configuration. Extend as needed.
module.exports = {
	port: process.env.PORT || 8124,
  db: {
    url: process.env.DATABASE_URL || 'mongodb://asset_mapping:27017/user'
  }
};
