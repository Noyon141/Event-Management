-- Quick fix: Add clerk_id column to existing users table
-- Run this in MySQL Workbench

USE event_management; -- Replace with your actual database name

-- Add clerk_id column to users table
ALTER TABLE users ADD COLUMN clerk_id VARCHAR(255) UNIQUE;

-- Update the users table to include your Clerk user ID
-- Replace 'user_32PYaRuSpiIZwdjWXR4ix7iHERB' with your actual Clerk user ID
UPDATE users SET clerk_id = 'user_32PYaRuSpiIZwdjWXR4ix7iHERB' WHERE id = 1;

-- Add role column if it doesn't exist
ALTER TABLE users ADD COLUMN role ENUM('admin', 'user') DEFAULT 'user';

-- Set the first user as admin
UPDATE users SET role = 'admin' WHERE id = 1;
