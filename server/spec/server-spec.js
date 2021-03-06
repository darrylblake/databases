/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

       var tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/users",
              json: { username: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                message: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = "SELECT * FROM messages";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal("In mercy's name, three days is all I need.");

          done();
        }); //db.query
      }); //request
    }); //request
  }); //it

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
       // var queryString = "INSERT INTO users SET ?";
       // var queryArgs = [{username: 'Test', 'text': 'Men like you can never change!', 'roomname': 'main'}];
       // var queryArgs = [{username: 'Test', 'text': 'Men like you can never change!', 'roomname': 'main'}];

    var username = 'Bobby';
    var roomname = 'Hell';
    var message = 'It is hot here.';

    var queryUsers = "INSERT INTO users (username) VALUES ('"+username+"');";
    var queryRooms = "INSERT INTO rooms (roomname) VALUES ('"+roomname+"');";
    var queryMessages = "INSERT INTO messages (user_id, room_id, text) VALUES ( ( SELECT id FROM users WHERE username='"+username+"' ), ( SELECT id FROM rooms WHERE roomname='"+roomname+"' ),'"+ message +"');"

    dbConnection.query(queryUsers, function(err, data){
      dbConnection.query(queryRooms, function(err, data) {
        dbConnection.query(queryMessages, function(err, data) {
          request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog[0].text).to.equal("It is hot here.");
            expect(messageLog[0].roomname).to.equal("Hell");
            done();
          });
        });
      });
      //console.log('Inside of messages POST. Data = ', data);
    }); //db.query   
  }); //it
}); //describe
