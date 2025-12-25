CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- 測試用帳號: admin / 123456
INSERT INTO users (username, password)
VALUES ('admin', '$2a$12$ZcmgJ17uzzwOU5xVD.ScuODY8B0OGp2wxJVpJ74d7Bu9mUMQzkQV2');