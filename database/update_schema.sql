USE event_management; 

ALTER TABLE users ADD COLUMN clerk_id VARCHAR(255) UNIQUE;


UPDATE users SET clerk_id = 'user_32PYaRuSpiIZwdjWXR4ix7iHERB' WHERE id = 1;


ALTER TABLE users ADD COLUMN role ENUM('admin', 'user') DEFAULT 'user';


UPDATE users SET role = 'admin' WHERE id = 1;
