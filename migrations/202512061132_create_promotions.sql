CREATE TABLE fu_promotions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data TEXT NOT NULL,
  createtime DATE NOT NULL,
  pdf VARCHAR(100) NULL DEFAULT '',
  INDEX idx_createtime (createtime)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;