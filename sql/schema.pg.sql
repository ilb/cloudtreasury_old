DROP DATABASE IF EXISTS cloudtreasury;
create database cloudtreasury;
CREATE USER cloudtreasury WITH PASSWORD 'cloudtreasury';
GRANT ALL PRIVILEGES ON DATABASE cloudtreasury to cloudtreasury;
ALTER USER cloudtreasury CREATEDB;
