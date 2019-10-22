CREATE DATABASE bosonglink;
USE bosonglink;
CREATE TABLE tablename ( id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	short_url VARCHAR(255) NOT NULL, 
	original_url VARCHAR(65535) NOT NULL, 
	owner_email VARCHAR(255), 
	is_deleted BOOLEAN DEFAULT false, 
	visit_count INT DEFAULT 0, 
	creation_date DATE DEFAULT CURRENT_DATE, 
	last_visited_date DEFAULT DATE CURRENT_DATE);
INSERT INTO tablename ( id, name ) VALUES ( null, '')