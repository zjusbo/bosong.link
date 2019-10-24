# Script to set up database
# $ mysql < init.sql
#
CREATE DATABASE IF NOT EXISTS bosonglink;
USE bosonglink;
CREATE TABLE IF NOT EXISTS url ( id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	short_url VARCHAR(255) UNIQUE NOT NULL, 
	original_url VARCHAR(65535) NOT NULL, 
	owner_email VARCHAR(255), 
	is_deleted BOOLEAN DEFAULT false, 
	creation_date DATE DEFAULT CURRENT_DATE);
INSERT INTO url (short_url, original_url, owner_email) VALUES ('default', 'www.bo-song.com');