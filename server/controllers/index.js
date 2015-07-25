var models = require('../models');
var bluebird = require('bluebird');
var url = require('url');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      db.query('SELECT users.username, rooms.roomname, messages.text FROM messages, users, rooms WHERE messages.user_id = users.id AND messages.room_id = rooms.id;', function(err,data){      
        console.log('Inside of messages get. Data = ', data);  
        res.end(JSON.stringify(data));
      }); //db.query

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var username = req.body.username;
      var message = req.body.message;
      var roomname = req.body.roomname;
      var queryString = 'INSERT INTO users (username) VALUES ("' + username + '");'; 

      db.query(queryString, function(err, data){
        if(err) console.log("ERROR INSIDE MESSAGE POST", err, data);

        console.log('Inside of messages POST. Data = ', data);

      }); //db.query

      // var queryString = 'INSERT INTO messages (username, text, roomname) VALUES ("' + username + '", "' + message + '", "' + roomname + '");'; 
      // db.query(queryString, function(err, data){if(err) console.log("ERROR INSIDE MESSAGE POST", err);}); //db.query
      // console.log('message queryString:', queryString);
      res.end();
    } // post: a function which handles posting a message to the database
  }, //messages

  users: {
    get: function (req, res) {
    },
    post: function (req, res) {
      var username = req.body.username;
      // connection.connect();
      // Checking if the user exists in the database
      db.query('select * from users where username="' + username + '";', function(err,data){
        if(err) console.log("ERROR in users GET. ", err)
        console.log('querying username: ', data);
        var dataArray = data;
        if (dataArray.length === 0) {
          console.log('not in database');
          console.log('username value ='+username);
          db.query('INSERT INTO users (username) VALUES ("' + username + '");');
        } // if
      }); // db.query

      res.end();
    } // post:function()
  } // users

  // 'messages/:id/:id2': {
  //   get: function (req, res) {
  //     res.end('params id = '+ req.params.id + ' ' + req.params.id2);
  //   }, // a function which handles a get request for all messages
  //   post: function (req, res) {} // a function which handles posting a message to the database
  // }
};

