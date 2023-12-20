-- feedback schema table
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    course_start_date DATE NOT NULL,
    days_served INTEGER NOT NULL,
    question1 TEXT NOT NULL,
    question2 TEXT NOT NULL,
    question3 TEXT NOT NULL,
    question4 TEXT NOT NULL,
    question5_1 INTEGER NOT NULL CHECK (question5_1 BETWEEN 0 AND 5),
    question5_2 INTEGER NOT NULL CHECK (question5_2 BETWEEN 0 AND 5),
    question5_3 INTEGER NOT NULL CHECK (question5_3 BETWEEN 0 AND 5),
    question5_4 INTEGER NOT NULL CHECK (question5_4 BETWEEN 0 AND 5),
    additional_info TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- EXAMPLE INSERT STATEMENTS

-- insert dummy data

-- INSERT INTO feedback (
--     name, 
--     email, 
--     course_start_date, 
--     days_served, 
--     question1, 
--     question2, 
--     question3, 
--     question4, 
--     q5_onboarding_rating, 
--     q5_resources_rating, 
--     q5_food_rating, 
--     q5_overall_experience_rating, 
--     additional_feedback
-- )
-- VALUES (
--     'John Doe', 
--     'john.doe@example.com', 
--     '2023-09-01', 
--     5, 
--     'To gain more experience in the field.', 
--     'Yes, I felt valued.', 
--     'No, I am looking forward to coming back.', 
--     'Personal commitments.', 
--     5, 
--     4, 
--     5, 
--     5, 
--     'The experience was wonderful, looking forward to more opportunities.'
-- );

-- -- user schema
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(100) NOT NULL,
--     isAdmin BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- insert dummy data
-- INSERT INTO users (
--     username, 
--     email, 
--     password,
--     "isAdmin" 
-- )
-- VALUES (
--     process.env.ADMIN_NAME,
--     process.env.ADMIN_EMAIL,
--     process.env.ADMIN_PASSWORD,
--     true,
-- )