//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

const http = require('http');

// const request = require('request');


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
      
      const options = {
        hostname: process.env.ASSET_SERVICE_HOST,
        port: process.env.ASSET_SERVICE_PORT,
        path: '/?username=' + username,
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };
      
      const httpReq = http.request(options, (httpRes) => {
        console.log('statusCode:', httpRes.statusCode);
        console.log('headers:', httpRes.headers);
      
        if(httpRes.statusCode != '200') {
          res.status(404).send('User not found.');
        }

        httpRes.on('data', (d) => {
          console.log(d);
          var assetObj = JSON.parse(d);

          if(!user) { 
            res.status(404).send('User not found.');
          } else {
            res.status(200).send({
              username: user.username,
              phoneNumber: user.phone_number,
              profile_image: assetObj.profile_image
            });
          }
        });
      });

      httpReq.on('error', function (e) {
        console.error(e);
      });
      httpReq.end();
      
    })
    .catch(next);
  });
};
