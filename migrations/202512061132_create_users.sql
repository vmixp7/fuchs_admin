CREATE TABLE fu_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 測試用帳號: admin / 123456
INSERT INTO fu_users (username, password)
VALUES ('admin', '$2a$12$.vV0Jk43J.MrruuAEdXXruSyByX6pxnRK3bjEBrs6E6tNSLCMc6DG');