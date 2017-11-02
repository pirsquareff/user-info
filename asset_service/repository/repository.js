//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var MongoClient = require('mongodb').MongoClient;

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    var self = this;
    MongoClient.connect(connectionSettings.url, function(err, database) {
      if(err) throw err;
      self.connection = database;
      console.log(self.connection);
    });
  }

  getUserByUsername(username) {
    
    return new Promise((resolve, reject) => {
      
      var query = { uname: username };

      this.connection.collection("userProfile").find(query).toArray(function(err, results) {
        if (err) {
          return reject(new Error('An error occured getting the user: ' + err));
        }
        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve({
            username: results[0].uname,
            profile_image: results[0].profile_image
          });
        }
      });

    });
  }

  disconnect() {
    this.connection.close();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.url) throw new Error("A host must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
