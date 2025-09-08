-- Event Management Database Schema

CREATE DATABASE IF NOT EXISTS event_management;
USE event_management;

-- Users table 
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Event attendees table (for future use)
CREATE TABLE IF NOT EXISTS event_attendees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_user (event_id, user_id)
);


INSERT IGNORE INTO users (clerk_id, email, first_name, last_name, role) 
VALUES ('user_32PYaRuSpiIZwdjWXR4ix7iHERB', 'admin@example.com', 'Admin', 'User', 'admin');

--sample events for testing
INSERT IGNORE INTO events (title, description, date, location, created_by) VALUES
('Welcome Meeting', 'Introduction meeting for new members', '2025-01-15 10:00:00', 'Conference Room A', 1),
('Project Kickoff', 'Starting our new project initiative', '2025-01-20 14:00:00', 'Main Hall', 1),
('Team Building Event', 'Fun team building activities', '2025-01-25 16:00:00', 'Outdoor Park', 1);
