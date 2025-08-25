-- Seed data for development and testing
-- This file contains realistic test data for the Allyti platform

-- Insert sample users (using realistic but fake data)
INSERT INTO users (email, password_hash, first_name, last_name, institution, graduation_year, program, is_verified, role, bio) VALUES
-- IIT Delhi Alumni
('rajesh.kumar@iitd.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Rajesh', 'Kumar', 'IIT Delhi', 2018, 'Computer Science', true, 'ALUMNI', 'Software Engineer at Google. Passionate about distributed systems and mentoring students.'),
('priya.sharma@iitd.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Priya', 'Sharma', 'IIT Delhi', 2019, 'Electrical Engineering', true, 'ALUMNI', 'Product Manager at Microsoft. Love building user-centric products.'),

-- IIT Bombay Students and Alumni
('amit.patel@iitb.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Amit', 'Patel', 'IIT Bombay', 2024, 'Computer Science', true, 'STUDENT', 'Final year student interested in machine learning and startups.'),
('sneha.reddy@iitb.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Sneha', 'Reddy', 'IIT Bombay', 2017, 'Mechanical Engineering', true, 'ALUMNI', 'Founder of a cleantech startup. IIT Bombay alumna working on sustainable solutions.'),

-- IIT Madras Alumni
('vikram.singh@iitm.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Vikram', 'Singh', 'IIT Madras', 2016, 'Computer Science', true, 'ALUMNI', 'Senior SDE at Amazon. Expertise in cloud infrastructure and system design.'),
('kavya.nair@iitm.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Kavya', 'Nair', 'IIT Madras', 2020, 'Aerospace Engineering', true, 'ALUMNI', 'Aerospace engineer at ISRO. Working on satellite technology and space missions.'),

-- IIM Ahmedabad Alumni
('arjun.gupta@iima.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Arjun', 'Gupta', 'IIM Ahmedabad', 2019, 'MBA', true, 'ALUMNI', 'Management Consultant at McKinsey. Previously worked in investment banking.'),
('meera.joshi@iima.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Meera', 'Joshi', 'IIM Ahmedabad', 2018, 'MBA', true, 'ALUMNI', 'Co-founder of fintech startup. Expert in digital payments and financial inclusion.'),

-- IIM Bangalore Students and Alumni
('rohit.agarwal@iimb.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Rohit', 'Agarwal', 'IIM Bangalore', 2024, 'MBA', true, 'STUDENT', 'Current MBA student with background in software engineering. Interested in product management.'),
('ananya.verma@iimb.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Ananya', 'Verma', 'IIM Bangalore', 2017, 'MBA', true, 'ALUMNI', 'VP Marketing at a unicorn startup. Passionate about brand building and growth hacking.'),

-- IIT Kanpur Alumni
('deepak.yadav@iitk.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Deepak', 'Yadav', 'IIT Kanpur', 2015, 'Computer Science', true, 'ALUMNI', 'CTO at a Series B startup. Building scalable systems and leading tech teams.'),

-- Faculty members
('prof.anil@iitd.ac.in', '$2b$12$LQv3c1yqBw2FLsxB0l8jj.5oowsovB1oiKvBfFO9mjEXcGnvL2zOG', 'Anil', 'Khanna', 'IIT Delhi', 1995, 'PhD Computer Science', true, 'FACULTY', 'Professor of Computer Science at IIT Delhi. Research interests in AI and machine learning.');

-- Insert user profiles for extended information
INSERT INTO user_profiles (user_id, current_company, current_position, current_location, industry, skills, linkedin_url, open_to_mentoring, seeking_mentorship, open_to_opportunities) VALUES
((SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 'Google', 'Senior Software Engineer', 'Mountain View, CA', 'Technology', ARRAY['Python', 'Go', 'Kubernetes', 'Distributed Systems'], 'https://linkedin.com/in/rajeshkumar', true, false, false),
((SELECT id FROM users WHERE email = 'priya.sharma@iitd.ac.in'), 'Microsoft', 'Senior Product Manager', 'Seattle, WA', 'Technology', ARRAY['Product Management', 'Data Analysis', 'User Research'], 'https://linkedin.com/in/priyasharma', true, false, false),
((SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), NULL, 'Student', 'Mumbai, India', 'Technology', ARRAY['Machine Learning', 'Python', 'React'], NULL, false, true, true),
((SELECT id FROM users WHERE email = 'sneha.reddy@iitb.ac.in'), 'GreenTech Solutions', 'Founder & CEO', 'Bangalore, India', 'Clean Technology', ARRAY['Entrepreneurship', 'Sustainability', 'Business Development'], 'https://linkedin.com/in/snehareddy', true, false, false),
((SELECT id FROM users WHERE email = 'vikram.singh@iitm.ac.in'), 'Amazon', 'Senior Software Development Engineer', 'Bangalore, India', 'Technology', ARRAY['AWS', 'Java', 'System Design', 'Microservices'], 'https://linkedin.com/in/vikramsingh', true, false, false),
((SELECT id FROM users WHERE email = 'arjun.gupta@iima.ac.in'), 'McKinsey & Company', 'Associate Principal', 'Mumbai, India', 'Consulting', ARRAY['Strategy Consulting', 'Digital Transformation', 'Analytics'], 'https://linkedin.com/in/arjungupta', true, false, false),
((SELECT id FROM users WHERE email = 'meera.joshi@iima.ac.in'), 'PayNext Solutions', 'Co-founder & CTO', 'Pune, India', 'Fintech', ARRAY['Fintech', 'Product Strategy', 'Team Leadership'], 'https://linkedin.com/in/meerajoshi', true, false, false);

-- Create some sample posts
INSERT INTO posts (user_id, content, visibility) VALUES
((SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 'Just completed a major migration of our microservices architecture to Kubernetes. The journey was challenging but the results are amazing - 40% reduction in deployment time and much better resource utilization. Happy to share learnings with anyone working on similar projects! #kubernetes #microservices #devops', 
 'PUBLIC'),

((SELECT id FROM users WHERE email = 'priya.sharma@iitd.ac.in'), 
 'Excited to share that our team just launched a new accessibility feature that will help millions of users with visual impairments. As product managers, we have the responsibility to build inclusive products. What are some accessibility features you''d love to see in tech products? #accessibility #productmanagement #inclusion', 
 'PUBLIC'),

((SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 'Looking for internship opportunities in machine learning for summer 2024. I''ve been working on computer vision projects and have experience with PyTorch and TensorFlow. Any referrals or advice would be greatly appreciated! #internship #machinelearning #computervision', 
 'PUBLIC'),

((SELECT id FROM users WHERE email = 'sneha.reddy@iitb.ac.in'), 
 'Our cleantech startup just raised Series A! 🎉 It''s been an incredible journey from an idea during my IIT days to now employing 50+ people working on sustainable solutions. Special thanks to the IIT Bombay ecosystem for the initial support. #startup #cleantech #sustainability #entrepreneurship', 
 'PUBLIC'),

((SELECT id FROM users WHERE email = 'vikram.singh@iitm.ac.in'), 
 'Pro tip for system design interviews: Always start with understanding the requirements clearly. I''ve seen many candidates jump into solutions without clarifying the scope. Take time to ask the right questions - it shows your thought process. #systemdesign #interviews #career', 
 'PUBLIC'),

((SELECT id FROM users WHERE email = 'arjun.gupta@iima.ac.in'), 
 'Fascinating insights from our latest digital transformation project with a traditional manufacturing company. The key is not just implementing new technology, but also managing the cultural change. People and process are as important as technology. #digitaltransformation #consulting #changemanagement', 
 'PUBLIC'),

((SELECT id FROM users WHERE email = 'meera.joshi@iima.ac.in'), 
 'India''s digital payment revolution continues to amaze me. We''re processing millions of transactions daily, and the innovation in this space is incredible. Proud to be part of building the financial infrastructure for the next billion users. #fintech #digitalpayments #india', 
 'PUBLIC');

-- Create some sample comments
INSERT INTO comments (post_id, user_id, content) VALUES
((SELECT id FROM posts WHERE content LIKE '%Kubernetes%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'vikram.singh@iitm.ac.in'), 
 'Great insights! We''re planning a similar migration. Would love to connect and learn from your experience. What were the biggest challenges you faced during the migration?'),

((SELECT id FROM posts WHERE content LIKE '%accessibility%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 'This is so important! At Google, we''ve seen how accessibility features often benefit all users, not just those with disabilities. Kudos to your team for prioritizing this.'),

((SELECT id FROM posts WHERE content LIKE '%internship%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'priya.sharma@iitd.ac.in'), 
 'Check out Microsoft''s AI for Good program. They have some excellent ML internship opportunities. Happy to provide a referral if you''re interested!'),

((SELECT id FROM posts WHERE content LIKE '%Series A%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'arjun.gupta@iima.ac.in'), 
 'Congratulations! The cleantech space is so crucial right now. Would love to hear more about your journey and the solutions you''re building.');

-- Create some sample connections
INSERT INTO connections (requester_id, addressee_id, status, message) VALUES
((SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 (SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 'ACCEPTED', 
 'Hi Rajesh, I''m a final year CS student at IIT Bombay. Would love to connect and learn from your experience at Google.'),

((SELECT id FROM users WHERE email = 'priya.sharma@iitd.ac.in'), 
 (SELECT id FROM users WHERE email = 'meera.joshi@iima.ac.in'), 
 'ACCEPTED', 
 'Hi Meera, saw your fintech startup story. As a PM at Microsoft, I''d love to exchange insights on product strategy.'),

((SELECT id FROM users WHERE email = 'vikram.singh@iitm.ac.in'), 
 (SELECT id FROM users WHERE email = 'deepak.yadav@iitk.ac.in'), 
 'ACCEPTED', 
 'Hey Deepak, fellow IITian in tech! Would be great to connect and share experiences.'),

((SELECT id FROM users WHERE email = 'rohit.agarwal@iimb.ac.in'), 
 (SELECT id FROM users WHERE email = 'arjun.gupta@iima.ac.in'), 
 'PENDING', 
 'Hi Arjun, current MBA student at IIM Bangalore. Would love to connect and learn about consulting careers.');

-- Create some sample job postings
INSERT INTO job_postings (posted_by, title, company, description, requirements, location, job_type, experience_level, salary_min, salary_max) VALUES
((SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 'Senior Software Engineer - Distributed Systems', 
 'Google', 
 'Join our Cloud Infrastructure team to build the next generation of distributed systems that power Google''s services. You''ll work on challenging problems at massive scale.', 
 ARRAY['5+ years of experience in distributed systems', 'Strong programming skills in Go/Java/C++', 'Experience with Kubernetes and containerization', 'Experience with large-scale storage systems'], 
 'Mountain View, CA', 
 'FULL_TIME', 
 'SENIOR', 
 180000, 
 250000),

((SELECT id FROM users WHERE email = 'sneha.reddy@iitb.ac.in'), 
 'Software Engineer - Clean Technology', 
 'GreenTech Solutions', 
 'Work on cutting-edge technology solutions for environmental challenges. Build software that makes a real impact on sustainability.', 
 ARRAY['2+ years of software development experience', 'Experience with Python/JavaScript', 'Interest in sustainability and clean technology', 'Strong problem-solving skills'], 
 'Bangalore, India', 
 'FULL_TIME', 
 'MID', 
 1200000, 
 1800000),

((SELECT id FROM users WHERE email = 'meera.joshi@iima.ac.in'), 
 'Product Manager - Fintech', 
 'PayNext Solutions', 
 'Lead product development for our digital payment platform. Work with engineering, design, and business teams to build products used by millions.', 
 ARRAY['3+ years of product management experience', 'Experience in fintech or payments domain', 'Strong analytical and communication skills', 'MBA preferred'], 
 'Pune, India', 
 'FULL_TIME', 
 'MID', 
 2000000, 
 3000000);

-- Create some sample job applications
INSERT INTO job_applications (job_id, applicant_id, cover_letter, status) VALUES
((SELECT id FROM job_postings WHERE title LIKE '%Software Engineer - Clean Technology%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 'I am excited about the opportunity to work on technology solutions for environmental challenges. My final year project focuses on optimizing energy consumption in data centers using machine learning.', 
 'APPLIED'),

((SELECT id FROM job_postings WHERE title LIKE '%Product Manager - Fintech%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'rohit.agarwal@iimb.ac.in'), 
 'As an MBA student with prior software engineering experience, I am passionate about building fintech products that can increase financial inclusion in India.', 
 'APPLIED');

-- Create some sample events
INSERT INTO events (organizer_id, title, description, event_type, start_time, end_time, location_type, venue_name, max_attendees, is_public) VALUES
((SELECT id FROM users WHERE email = 'prof.anil@iitd.ac.in'), 
 'AI in Healthcare: Opportunities and Challenges', 
 'A panel discussion on how artificial intelligence is transforming healthcare, featuring industry experts and researchers.', 
 'CONFERENCE', 
 NOW() + INTERVAL '30 days', 
 NOW() + INTERVAL '30 days' + INTERVAL '3 hours', 
 'HYBRID', 
 'IIT Delhi Lecture Hall Complex', 
 200, 
 true),

((SELECT id FROM users WHERE email = 'arjun.gupta@iima.ac.in'), 
 'IIM Alumni Networking Meetup - Mumbai', 
 'Join fellow IIM alumni in Mumbai for networking, drinks, and discussions about career growth and opportunities.', 
 'NETWORKING', 
 NOW() + INTERVAL '15 days', 
 NOW() + INTERVAL '15 days' + INTERVAL '4 hours', 
 'OFFLINE', 
 'The Club Mumbai', 
 50, 
 true),

((SELECT id FROM users WHERE email = 'vikram.singh@iitm.ac.in'), 
 'System Design Workshop for Students', 
 'A hands-on workshop covering system design fundamentals, case studies, and interview preparation. Perfect for final year students and recent graduates.', 
 'WORKSHOP', 
 NOW() + INTERVAL '20 days', 
 NOW() + INTERVAL '20 days' + INTERVAL '6 hours', 
 'ONLINE', 
 'Zoom', 
 100, 
 true);

-- Register some attendees for events
INSERT INTO event_attendees (event_id, user_id, status) VALUES
((SELECT id FROM events WHERE title LIKE '%AI in Healthcare%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 'REGISTERED'),

((SELECT id FROM events WHERE title LIKE '%AI in Healthcare%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 'REGISTERED'),

((SELECT id FROM events WHERE title LIKE '%Networking Meetup%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'meera.joshi@iima.ac.in'), 
 'REGISTERED'),

((SELECT id FROM events WHERE title LIKE '%System Design Workshop%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 'REGISTERED'),

((SELECT id FROM events WHERE title LIKE '%System Design Workshop%' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'rohit.agarwal@iimb.ac.in'), 
 'REGISTERED');

-- Create some sample likes for posts
INSERT INTO likes (user_id, post_id) VALUES
((SELECT id FROM users WHERE email = 'vikram.singh@iitm.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%Kubernetes%' LIMIT 1)),

((SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%Kubernetes%' LIMIT 1)),

((SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%accessibility%' LIMIT 1)),

((SELECT id FROM users WHERE email = 'meera.joshi@iima.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%accessibility%' LIMIT 1)),

((SELECT id FROM users WHERE email = 'priya.sharma@iitd.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%Series A%' LIMIT 1)),

((SELECT id FROM users WHERE email = 'arjun.gupta@iima.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%Series A%' LIMIT 1));

-- Update post engagement counts based on likes and comments
UPDATE posts SET 
    like_count = (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id),
    comment_count = (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id);

-- Create sample notifications
INSERT INTO notifications (user_id, type, title, message, related_user_id, related_post_id, action_url) VALUES
((SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 'CONNECTION_REQUEST', 
 'New connection request', 
 'Amit Patel wants to connect with you', 
 (SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 NULL, 
 '/connections/requests'),

((SELECT id FROM users WHERE email = 'priya.sharma@iitd.ac.in'), 
 'POST_LIKE', 
 'Your post was liked', 
 'Rajesh Kumar and 2 others liked your post about accessibility features', 
 (SELECT id FROM users WHERE email = 'rajesh.kumar@iitd.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%accessibility%' LIMIT 1), 
 '/posts/' || (SELECT id FROM posts WHERE content LIKE '%accessibility%' LIMIT 1)),

((SELECT id FROM users WHERE email = 'amit.patel@iitb.ac.in'), 
 'COMMENT', 
 'New comment on your post', 
 'Priya Sharma commented on your internship post', 
 (SELECT id FROM users WHERE email = 'priya.sharma@iitd.ac.in'), 
 (SELECT id FROM posts WHERE content LIKE '%internship%' LIMIT 1), 
 '/posts/' || (SELECT id FROM posts WHERE content LIKE '%internship%' LIMIT 1));

COMMIT;
