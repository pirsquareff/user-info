//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/', (req, res, next) => {
    //  Get the email.
    var username = req.query.username;
    if (!username) {
      throw new Error("When searching for a user, the username must be specified, e.g: '/?username=test_username'.");
    }

    //  Get the user from the repo.
    options.repository.getUserByUsername(username).then((user) => {

      if(!user) { 
        res.status(404).send('User not found.');
      } else {
        res.status(200).send({
          username: user.username,
          profile_image: user.profile_image
        });
      }
    })
    .catch(next);
  });
};
