CREATE DATABASE cordialsdesign;

USE cordialsdesign;

CREATE TABLE users
(
    id INT (11) NOT NULL,
    userName VARCHAR (20) NOT NULL,
    password VARCHAR (500) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

CREATE TABLE portfolio
(
    id INT (11) NOT NULL AUTO_INCREMENT,
    imgurl VARCHAR (100) NOT NULL,
    description VARCHAR (200),
    PRIMARY KEY (id)
);

ALTER TABLE portfolio
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE portfolio;

CREATE TABLE contacts
(
    id INT (11) NOT NULL AUTO_INCREMENT,
    contact VARCHAR (100) NOT NULL,
    link VARCHAR (200),
    icon VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE contacts
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE contacts;
