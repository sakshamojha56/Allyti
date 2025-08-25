// MongoDB seed data for anonymous communities
// This script populates the anonymous section with realistic test data

db = db.getSiblingDB('allyti_anonymous');

// Create sample anonymous users
const anonymousUsers = [
  {
    _id: ObjectId(),
    session_id: "anon_session_001",
    created_at: new Date(),
    last_active: new Date(),
    reputation_score: 150,
    badges: ["helpful_commenter", "active_member"],
    preferences: {
      topics_of_interest: ["career_advice", "tech_discussions", "startup_stories"],
      notification_settings: {
        new_replies: true,
        trending_posts: false,
        weekly_digest: true
      }
    }
  },
  {
    _id: ObjectId(),
    session_id: "anon_session_002", 
    created_at: new Date(Date.now() - 86400000 * 7), // 7 days ago
    last_active: new Date(),
    reputation_score: 89,
    badges: ["problem_solver"],
    preferences: {
      topics_of_interest: ["interview_prep", "salary_discussions", "work_life_balance"],
      notification_settings: {
        new_replies: true,
        trending_posts: true,
        weekly_digest: false
      }
    }
  },
  {
    _id: ObjectId(),
    session_id: "anon_session_003",
    created_at: new Date(Date.now() - 86400000 * 30), // 30 days ago
    last_active: new Date(Date.now() - 86400000 * 2), // 2 days ago
    reputation_score: 234,
    badges: ["mentor", "helpful_commenter", "active_member"],
    preferences: {
      topics_of_interest: ["mentorship", "career_growth", "industry_insights"],
      notification_settings: {
        new_replies: true,
        trending_posts: true,
        weekly_digest: true
      }
    }
  },
  {
    _id: ObjectId(),
    session_id: "anon_session_004",
    created_at: new Date(Date.now() - 86400000 * 14), // 14 days ago
    last_active: new Date(),
    reputation_score: 45,
    badges: [],
    preferences: {
      topics_of_interest: ["placement_help", "resume_review", "company_culture"],
      notification_settings: {
        new_replies: true,
        trending_posts: false,
        weekly_digest: true
      }
    }
  },
  {
    _id: ObjectId(),
    session_id: "anon_session_005",
    created_at: new Date(Date.now() - 86400000 * 60), // 60 days ago
    last_active: new Date(Date.now() - 86400000 * 1), // 1 day ago
    reputation_score: 312,
    badges: ["mentor", "problem_solver", "active_member", "top_contributor"],
    preferences: {
      topics_of_interest: ["entrepreneurship", "funding", "startup_life", "leadership"],
      notification_settings: {
        new_replies: true,
        trending_posts: true,
        weekly_digest: true
      }
    }
  }
];

db.anonymous_users.insertMany(anonymousUsers);

// Create sample communities
const communities = [
  {
    _id: ObjectId(),
    name: "Career Advice",
    description: "Get honest advice about career decisions, job switches, and professional growth",
    rules: [
      "Be respectful and constructive",
      "No doxxing or attempts to identify users", 
      "Share experiences, not just opinions",
      "No spam or self-promotion"
    ],
    tags: ["career", "advice", "jobs", "growth"],
    member_count: 1247,
    post_count: 89,
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 90), // 90 days ago
    moderators: [anonymousUsers[2]._id, anonymousUsers[4]._id],
    guidelines: "This community is for seeking and giving career advice anonymously. Share your experiences and help others navigate their professional journey."
  },
  {
    _id: ObjectId(),
    name: "Salary Transparency",
    description: "Anonymous discussions about compensation, packages, and salary negotiations",
    rules: [
      "Use anonymous format: Company/Role/YOE/Location/Package",
      "No company bashing",
      "Verify information when possible",
      "Help others with salary negotiations"
    ],
    tags: ["salary", "compensation", "packages", "negotiations"],
    member_count: 2156,
    post_count: 156,
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 120), // 120 days ago
    moderators: [anonymousUsers[4]._id],
    guidelines: "Share salary information anonymously to help the community make informed decisions. Always include context like experience level, location, and role."
  },
  {
    _id: ObjectId(),
    name: "Interview Experiences",
    description: "Share interview experiences, questions asked, and preparation tips",
    rules: [
      "Include company name and role",
      "Share actual questions asked",
      "Mention preparation resources",
      "Be helpful to future candidates"
    ],
    tags: ["interviews", "preparation", "questions", "experiences"],
    member_count: 1834,
    post_count: 134,
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 75), // 75 days ago
    moderators: [anonymousUsers[1]._id, anonymousUsers[2]._id],
    guidelines: "Help fellow job seekers by sharing your interview experiences. Include as much detail as possible while maintaining anonymity."
  },
  {
    _id: ObjectId(),
    name: "Workplace Culture",
    description: "Honest discussions about company culture, work-life balance, and workplace issues",
    rules: [
      "No doxxing of individuals",
      "Focus on culture and practices",
      "Be constructive in criticism",
      "Help others make informed decisions"
    ],
    tags: ["culture", "workplace", "balance", "companies"],
    member_count: 967,
    post_count: 67,
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 45), // 45 days ago
    moderators: [anonymousUsers[3]._id],
    guidelines: "Share insights about company culture and workplace practices. Help others understand what it's really like to work at different companies."
  },
  {
    _id: ObjectId(),
    name: "Startup Confessions",
    description: "Anonymous stories from the startup world - failures, successes, and lessons learned",
    rules: [
      "Share real experiences only",
      "No identifying details about stealth startups",
      "Learn from both failures and successes",
      "Provide actionable insights"
    ],
    tags: ["startup", "entrepreneurship", "stories", "lessons"],
    member_count: 723,
    post_count: 45,
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 60), // 60 days ago
    moderators: [anonymousUsers[4]._id],
    guidelines: "Share your startup journey anonymously. Whether you failed or succeeded, your story can help others navigate the startup world."
  }
];

db.communities.insertMany(communities);

// Create sample posts
const posts = [
  {
    _id: ObjectId(),
    community_id: communities[0]._id, // Career Advice
    author_id: anonymousUsers[0]._id,
    title: "Should I take a 30% pay cut to join a dream company?",
    content: "I'm currently at a Big Tech company making good money, but I got an offer from my dream company (smaller but doing amazing work in AI). The role is perfect for my career goals but the salary is 30% less. I have 3 years of experience and no major financial obligations. What would you do?",
    tags: ["career_decision", "salary", "big_tech", "ai"],
    created_at: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updated_at: new Date(Date.now() - 86400000 * 2),
    vote_score: 23,
    comment_count: 8,
    view_count: 156,
    is_locked: false,
    report_count: 0
  },
  {
    _id: ObjectId(),
    community_id: communities[1]._id, // Salary Transparency  
    author_id: anonymousUsers[1]._id,
    title: "Google SDE-2 / 4 YOE / Bangalore / 45 LPA",
    content: "Google SDE-2\n4 Years Experience\nBangalore, India\nBase: 28 LPA\nBonus: 8 LPA\nStocks: 9 LPA (vested over 4 years)\nTotal: 45 LPA\n\nNegotiated from initial offer of 38 LPA. Key was competing offer from Microsoft. Happy to answer questions about the process.",
    tags: ["google", "sde2", "bangalore", "negotiation"],
    created_at: new Date(Date.now() - 86400000 * 1), // 1 day ago
    updated_at: new Date(Date.now() - 86400000 * 1),
    vote_score: 47,
    comment_count: 12,
    view_count: 234,
    is_locked: false,
    report_count: 0
  },
  {
    _id: ObjectId(),
    community_id: communities[2]._id, // Interview Experiences
    author_id: anonymousUsers[2]._id,
    title: "Microsoft SDE Interview Experience - Rejected after 4 rounds",
    content: "Applied for SDE role at Microsoft. Got through online test but got rejected after onsite. Sharing the questions I remember:\n\nRound 1 (Coding): \n- Two Sum problem and follow-up with sorted array\n- Design a simple cache with LRU eviction\n\nRound 2 (System Design):\n- Design a URL shortener like bit.ly\n- Discussed scalability, database design, caching\n\nRound 3 (Behavioral):\n- Tell me about a time you disagreed with your manager\n- How do you handle tight deadlines\n\nRound 4 (Coding):\n- Find median in a stream of integers\n- Optimize for memory usage\n\nI think I did well in coding rounds but struggled with system design. The interviewer kept asking about handling 1 billion requests per day and I got nervous. Preparation tip: practice system design extensively!",
    tags: ["microsoft", "sde", "rejected", "system_design"],
    created_at: new Date(Date.now() - 86400000 * 3), // 3 days ago
    updated_at: new Date(Date.now() - 86400000 * 3),
    vote_score: 34,
    comment_count: 15,
    view_count: 189,
    is_locked: false,
    report_count: 0
  },
  {
    _id: ObjectId(),
    community_id: communities[3]._id, // Workplace Culture
    author_id: anonymousUsers[3]._id,
    title: "Toxic manager making my life hell - need advice",
    content: "I've been at this company for 8 months and my manager is making my life miserable. Examples:\n\n- Takes credit for my work in team meetings\n- Sets unrealistic deadlines then blames me for delays\n- Constantly interrupts me in meetings\n- Never gives clear feedback, just says 'this needs to be better'\n- Plays favorites with certain team members\n\nI've tried talking to him directly but it made things worse. HR seems friendly with him. I like the company and the work, but this situation is affecting my mental health. Should I:\n\n1. Try to transfer to another team\n2. Go to HR despite the relationship\n3. Start looking for a new job\n4. Stick it out and hope he leaves\n\nHas anyone dealt with something similar? How did you handle it?",
    tags: ["toxic_manager", "workplace_advice", "hr", "mental_health"],
    created_at: new Date(Date.now() - 86400000 * 4), // 4 days ago
    updated_at: new Date(Date.now() - 86400000 * 4),
    vote_score: 56,
    comment_count: 23,
    view_count: 312,
    is_locked: false,
    report_count: 0
  },
  {
    _id: ObjectId(),
    community_id: communities[4]._id, // Startup Confessions
    author_id: anonymousUsers[4]._id,
    title: "My startup failed because I ignored user feedback",
    content: "Built a productivity app for 18 months. Raised 50L in seed funding. Had to shut down last month.\n\nThe biggest mistake? I was so convinced about my vision that I ignored user feedback. Users kept asking for simpler features, but I kept adding complex ones because 'that's what makes us unique'.\n\nSome hard lessons:\n\n1. Build what users want, not what you think they need\n2. Get paying customers ASAP - free users don't validate anything\n3. Focus on one core feature and nail it\n4. Don't hire too fast - we burned through 60% of funding on salaries\n5. Co-founder disagreements will kill you if not resolved early\n\nI'm back to a day job now but planning to start again. This time I'll listen more and assume less.\n\nTo other founders: validate everything, especially your assumptions about what users want.",
    tags: ["failure", "lessons", "user_feedback", "funding"],
    created_at: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updated_at: new Date(Date.now() - 86400000 * 5),
    vote_score: 89,
    comment_count: 31,
    view_count: 445,
    is_locked: false,
    report_count: 0
  },
  {
    _id: ObjectId(),
    community_id: communities[0]._id, // Career Advice
    author_id: anonymousUsers[2]._id,
    title: "Is it normal to feel imposter syndrome after promotion?",
    content: "Got promoted to Senior SDE last month after 4 years at the company. I'm happy about it but also terrified. The expectations feel much higher and I'm worried I'm not ready.\n\nI see my peers who got promoted with me and they seem so confident. Meanwhile, I'm googling basic concepts and second-guessing every technical decision.\n\nIs this normal? How long does it take to feel comfortable in a new role? Any tips for dealing with imposter syndrome?",
    tags: ["promotion", "imposter_syndrome", "senior_sde", "confidence"],
    created_at: new Date(Date.now() - 86400000 * 6), // 6 days ago
    updated_at: new Date(Date.now() - 86400000 * 6),
    vote_score: 42,
    comment_count: 18,
    view_count: 201,
    is_locked: false,
    report_count: 0
  }
];

db.posts.insertMany(posts);

// Create sample comments
const comments = [
  {
    _id: ObjectId(),
    post_id: posts[0]._id, // Dream company post
    author_id: anonymousUsers[2]._id,
    content: "I was in a similar situation 2 years ago. Took the pay cut and it was the best decision ever. The learning opportunities and work satisfaction more than made up for the money. Plus, the experience I gained helped me get an even better offer later.",
    created_at: new Date(Date.now() - 86400000 * 1.5), // 1.5 days ago
    updated_at: new Date(Date.now() - 86400000 * 1.5),
    vote_score: 12,
    reply_count: 2,
    is_deleted: false
  },
  {
    _id: ObjectId(),
    post_id: posts[0]._id, // Dream company post
    author_id: anonymousUsers[4]._id,
    content: "30% is a lot. I'd negotiate harder first. Can you get the dream company to match at least 80% of your current salary? Also consider total comp including equity and benefits, not just base salary.",
    created_at: new Date(Date.now() - 86400000 * 1.2), // 1.2 days ago
    updated_at: new Date(Date.now() - 86400000 * 1.2),
    vote_score: 8,
    reply_count: 1,
    is_deleted: false
  },
  {
    _id: ObjectId(),
    post_id: posts[1]._id, // Google salary post
    author_id: anonymousUsers[0]._id,
    content: "How did you get the competing offer from Microsoft? Did you apply cold or through referral? And how long did the negotiation process take?",
    created_at: new Date(Date.now() - 86400000 * 0.8), // 0.8 days ago
    updated_at: new Date(Date.now() - 86400000 * 0.8),
    vote_score: 5,
    reply_count: 0,
    is_deleted: false
  },
  {
    _id: ObjectId(),
    post_id: posts[2]._id, // Microsoft interview post
    author_id: anonymousUsers[3]._id,
    content: "Thanks for sharing! The system design questions you mentioned are pretty standard. For the URL shortener, what specific aspects did you struggle with? Database partitioning or the actual shortening algorithm?",
    created_at: new Date(Date.now() - 86400000 * 2.5), // 2.5 days ago
    updated_at: new Date(Date.now() - 86400000 * 2.5),
    vote_score: 7,
    reply_count: 1,
    is_deleted: false
  },
  {
    _id: ObjectId(),
    post_id: posts[3]._id, // Toxic manager post
    author_id: anonymousUsers[1]._id,
    content: "Document everything! Start keeping a record of all interactions, missed deadlines with reasons, credit-taking instances, etc. This will be crucial if you need to escalate to HR or if things get legal. Also, try to find allies in other teams who can vouch for your work quality.",
    created_at: new Date(Date.now() - 86400000 * 3.5), // 3.5 days ago
    updated_at: new Date(Date.now() - 86400000 * 3.5),
    vote_score: 23,
    reply_count: 3,
    is_deleted: false
  },
  {
    _id: ObjectId(),
    post_id: posts[4]._id, // Startup failure post
    author_id: anonymousUsers[0]._id,
    content: "Thanks for sharing this. It takes courage to admit failure and share lessons. Your point about paying customers vs free users really resonates. We made the same mistake with our side project. How are you planning to validate your next idea differently?",
    created_at: new Date(Date.now() - 86400000 * 4.5), // 4.5 days ago
    updated_at: new Date(Date.now() - 86400000 * 4.5),
    vote_score: 15,
    reply_count: 1,
    is_deleted: false
  },
  {
    _id: ObjectId(),
    post_id: posts[5]._id, // Imposter syndrome post
    author_id: anonymousUsers[4]._id,
    content: "Totally normal! I felt the same way when I got promoted to tech lead. The key is to remember that your company promoted you for a reason - they see your potential. Focus on learning and don't be afraid to ask questions. Senior doesn't mean you know everything, it means you know how to figure things out.",
    created_at: new Date(Date.now() - 86400000 * 5.5), // 5.5 days ago
    updated_at: new Date(Date.now() - 86400000 * 5.5),
    vote_score: 18,
    reply_count: 2,
    is_deleted: false
  }
];

db.comments.insertMany(comments);

// Create sample votes for posts
const postVotes = [
  // Dream company post votes
  { user_id: anonymousUsers[1]._id, post_id: posts[0]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[2]._id, post_id: posts[0]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[3]._id, post_id: posts[0]._id, vote_type: "upvote", created_at: new Date() },
  
  // Google salary post votes
  { user_id: anonymousUsers[0]._id, post_id: posts[1]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[2]._id, post_id: posts[1]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[3]._id, post_id: posts[1]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[4]._id, post_id: posts[1]._id, vote_type: "upvote", created_at: new Date() },
  
  // Startup failure post votes
  { user_id: anonymousUsers[0]._id, post_id: posts[4]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[1]._id, post_id: posts[4]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[2]._id, post_id: posts[4]._id, vote_type: "upvote", created_at: new Date() },
  { user_id: anonymousUsers[3]._id, post_id: posts[4]._id, vote_type: "upvote", created_at: new Date() }
];

db.votes.insertMany(postVotes);

// Create sample private messages
const messages = [
  {
    _id: ObjectId(),
    from_user_id: anonymousUsers[0]._id,
    to_user_id: anonymousUsers[2]._id,
    content: "Hey, saw your comment about taking the pay cut for your dream company. Can you share more details about how the experience helped your career?",
    created_at: new Date(Date.now() - 86400000 * 1), // 1 day ago
    is_read: false,
    conversation_id: "conv_001"
  },
  {
    _id: ObjectId(),
    from_user_id: anonymousUsers[2]._id,
    to_user_id: anonymousUsers[0]._id,
    content: "Sure! The main thing was that I got exposure to cutting-edge projects and worked directly with the CTO. That experience was invaluable when I interviewed at other companies later. The network I built there also opened many doors.",
    created_at: new Date(Date.now() - 86400000 * 0.8), // 0.8 days ago
    is_read: true,
    conversation_id: "conv_001"
  }
];

db.messages.insertMany(messages);

// Create sample moderation logs
const moderationLogs = [
  {
    _id: ObjectId(),
    content_type: "post",
    content_id: posts[0]._id,
    moderator_id: anonymousUsers[2]._id,
    action: "approved",
    reason: "Post follows community guidelines",
    created_at: new Date(Date.now() - 86400000 * 2),
    automated: false
  },
  {
    _id: ObjectId(),
    content_type: "comment", 
    content_id: comments[0]._id,
    moderator_id: null,
    action: "flagged",
    reason: "Automated flag: potential spam keywords detected",
    created_at: new Date(Date.now() - 86400000 * 1.5),
    automated: true,
    details: {
      confidence_score: 0.3,
      keywords_flagged: ["best decision ever"],
      action_taken: "human_review_required"
    }
  }
];

db.moderation_logs.insertMany(moderationLogs);

print("MongoDB seed data inserted successfully!");
print("Inserted:");
print("- " + anonymousUsers.length + " anonymous users");
print("- " + communities.length + " communities");
print("- " + posts.length + " posts");
print("- " + comments.length + " comments");
print("- " + postVotes.length + " votes");
print("- " + messages.length + " messages");
print("- " + moderationLogs.length + " moderation logs");
