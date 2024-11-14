CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    chat_id INT REFERENCES chats(chat_id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE chats (
    chat_id SERIAL PRIMARY KEY,
    chat_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password_hash)
VALUES
('johndoe', 'john@example.com', 'hashed_password_1'),
('janedoe', 'jane@example.com', 'hashed_password_2'),
('mike123', 'mike@example.com', 'hashed_password_3');

INSERT INTO messages (user_id, chat_id, content)
VALUES
(1, 1, 'Hey everyone!'),
(2, 1, 'Hello John!'),
(3, 1, 'What’s up everyone?'),
(1, 2, 'Ready for the project meeting?'),
(2, 3, 'Movie night tonight!'),
(3, 3, 'I’m down for the movie!');


INSERT INTO chats (chat_name)
VALUES
('General Chat'),
('Project Group'),
('Friends Hangout');

