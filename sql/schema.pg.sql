DROP DATABASE IF EXISTS dictionaries;
create database dictionaries;
CREATE USER dictionaries WITH PASSWORD 'dictionaries';
GRANT ALL PRIVILEGES ON DATABASE dictionaries to dictionaries;
ALTER USER dictionaries CREATEDB;
