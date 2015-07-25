DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  user_id int(11),
  room_id int(11),
  text varchar(140), 
  createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  username char(50) UNIQUE KEY, 
  password char(50) 
);

CREATE TABLE rooms (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  roomname char(50) UNIQUE KEY
);

/* FIXTURE */

/*  Execute this file from the command line by typing:
INSERT INTO users (username) VALUES ('Darryl');
INSERT INTO users (username) VALUES ('Payton');
INSERT INTO rooms (roomname) VALUES ('Lobby');
INSERT INTO rooms (roomname) VALUES ('General');
INSERT INTO messages (user_id, room_id, text) VALUES (2, 1, 'First message.. yay');
INSERT INTO messages (user_id, room_id, text) VALUES (1, 1, 'Second message.');


 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

