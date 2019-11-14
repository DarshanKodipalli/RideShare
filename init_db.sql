CREATE DATABASE IF NOT EXISTS rideshare;
CREATE USER IF NOT EXISTS 'rideshareAdmin'@'localhost' IDENTIFIED BY 'qwerty@123';
GRANT ALL PRIVILEGES ON * . * TO 'rideshareAdmin'@'localhost';
FLUSH PRIVILEGES;