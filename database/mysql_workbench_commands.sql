
USE event_management; 
 only if the column doesn't exist)
ALTER TABLE users ADD COLUMN clerk_id VARCHAR(255) UNIQUE;

-- Add role column (run this only if the column doesn't exist)
ALTER TABLE users ADD COLUMN role ENUM('admin', 'user') DEFAULT 'user';

INSERT INTO users (clerk_id, email, first_name, last_name, role) 
VALUES ('user_32PYaRuSpiIZwdjWXR4ix7iHERB', 'admin@example.com', 'Admin', 'User', 'admin')

ON DUPLICATE KEY UPDATE role = 'admin';

SELECT * FROM users;
