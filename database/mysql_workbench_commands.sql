-- MySQL Workbench Compatible Commands
-- Run these commands one by one in MySQL Workbench

-- First, use your database
USE event_management; -- Replace 'event_management' with your actual database name

-- Check if clerk_id column exists, if not add it
-- Run this first to see the current structure
DESCRIBE users;

-- Add clerk_id column (run this only if the column doesn't exist)
ALTER TABLE users ADD COLUMN clerk_id VARCHAR(255) UNIQUE;

-- Add role column (run this only if the column doesn't exist)
ALTER TABLE users ADD COLUMN role ENUM('admin', 'user') DEFAULT 'user';

-- Insert your admin user (replace the clerk_id with your actual one)
-- You can find your Clerk user ID by logging into your app and checking the browser's developer console
INSERT INTO users (clerk_id, email, first_name, last_name, role) 
VALUES ('user_32PYaRuSpiIZwdjWXR4ix7iHERB', 'admin@example.com', 'Admin', 'User', 'admin')
ON DUPLICATE KEY UPDATE role = 'admin';

-- Verify the changes
SELECT * FROM users;
