# Script to set up database
# it does not overwrite an existing database
# $ mysql < init.sql
#
CREATE DATABASE IF NOT EXISTS bosonglink;
USE bosonglink;
CREATE TABLE IF NOT EXISTS url ( 
	id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	short_url VARCHAR(255) NOT NULL, 
	original_url VARCHAR(4096) NOT NULL, 
	owner_email VARCHAR(255), 
	is_deleted BOOLEAN DEFAULT false, 
	creation_date DATE); 
INSERT INTO url (short_url, original_url, owner_email, creation_date) VALUES ('test', 'www.bo-song.com', 'songbo.sunny@gmail.com', '2019-01-01');

INSERT INTO url (short_url, original_url, creation_date) VALUES ('test-anno', 'www.bo-song.com', '2019-01-01');
