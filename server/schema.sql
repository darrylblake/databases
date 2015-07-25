DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  username char(50), 
  text varchar(140), 
  roomname varchar(50),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  username char(50)
);

/* FIXTURE
INSERT INTO users (username) VALUES ('Darryl');
INSERT INTO users (username) VALUES ('Payton');
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

