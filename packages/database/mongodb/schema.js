// MongoDB schema for anonymous communities
// This file defines the collections and indexes for the anonymous section

// Anonymous Users Collection
// Note: These are separate from PostgreSQL users to maintain anonymity
db.createCollection("anonymous_users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["anonymousId", "hashedCredentials", "institutionVerified"],
      properties: {
        anonymousId: {
          bsonType: "string",
          description: "Unique anonymous identifier - cryptographically generated"
        },
        hashedCredentials: {
          bsonType: "string",
          description: "One-way hash of original credentials for verification"
        },
        institutionVerified: {
          bsonType: "bool",
          description: "Whether the anonymous user's institution is verified"
        },
        institutionCategory: {
          bsonType: "string",
          enum: ["IIT", "IIM"],
          description: "Institution category without revealing specific institution"
        },
        graduationYearRange: {
          bsonType: "string",
          enum: ["2010-2015", "2016-2020", "2021-2025", "2026-2030"],
          description: "Graduation year range for basic demographics"
        },
        profileMetadata: {
          bsonType: "object",
          properties: {
            karma: { bsonType: "int", minimum: 0 },
            trustScore: { bsonType: "double", minimum: 0, maximum: 1 },
            communitiesJoined: { bsonType: "int" },
            postsCount: { bsonType: "int" },
            commentsCount: { bsonType: "int" }
          }
        },
        preferences: {
          bsonType: "object",
          properties: {
            allowDirectMessages: { bsonType: "bool" },
            showInstitutionCategory: { bsonType: "bool" },
            showGraduationRange: { bsonType: "bool" }
          }
        },
        createdAt: { bsonType: "date" },
        lastActiveAt: { bsonType: "date" }
      }
    }
  }
});

// Anonymous Communities Collection
db.createCollection("communities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "createdBy", "type"],
      properties: {
        name: {
          bsonType: "string",
          maxLength: 100,
          description: "Community name"
        },
        description: {
          bsonType: "string",
          maxLength: 500,
          description: "Community description"
        },
        slug: {
          bsonType: "string",
          description: "URL-friendly community identifier"
        },
        type: {
          bsonType: "string",
          enum: ["PUBLIC", "PRIVATE", "RESTRICTED"],
          description: "Community access level"
        },
        category: {
          bsonType: "string",
          enum: ["ACADEMIC", "CAREER", "LIFESTYLE", "TECH", "BUSINESS", "SOCIAL", "SUPPORT"],
          description: "Community category"
        },
        createdBy: {
          bsonType: "string",
          description: "Anonymous ID of creator"
        },
        moderators: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Array of anonymous IDs of moderators"
        },
        memberCount: {
          bsonType: "int",
          minimum: 0,
          description: "Number of community members"
        },
        postCount: {
          bsonType: "int",
          minimum: 0,
          description: "Number of posts in community"
        },
        rules: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Community rules"
        },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Community tags for discovery"
        },
        isArchived: {
          bsonType: "bool",
          description: "Whether community is archived"
        },
        settings: {
          bsonType: "object",
          properties: {
            allowPolls: { bsonType: "bool" },
            allowImages: { bsonType: "bool" },
            allowLinks: { bsonType: "bool" },
            requireApproval: { bsonType: "bool" },
            autoModeration: { bsonType: "bool" }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Anonymous Posts Collection
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content", "authorId", "communityId"],
      properties: {
        title: {
          bsonType: "string",
          maxLength: 300,
          description: "Post title"
        },
        content: {
          bsonType: "string",
          maxLength: 10000,
          description: "Post content"
        },
        contentType: {
          bsonType: "string",
          enum: ["TEXT", "POLL", "LINK", "IMAGE"],
          description: "Type of post content"
        },
        authorId: {
          bsonType: "string",
          description: "Anonymous ID of post author"
        },
        communityId: {
          bsonType: "objectId",
          description: "ID of the community this post belongs to"
        },
        flair: {
          bsonType: "string",
          description: "Post flair/category"
        },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Post tags"
        },
        mediaUrls: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "URLs of attached media"
        },
        linkUrl: {
          bsonType: "string",
          description: "External link URL"
        },
        pollOptions: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              text: { bsonType: "string" },
              votes: { bsonType: "int", minimum: 0 }
            }
          },
          description: "Poll options if post is a poll"
        },
        engagement: {
          bsonType: "object",
          properties: {
            upvotes: { bsonType: "int", minimum: 0 },
            downvotes: { bsonType: "int", minimum: 0 },
            commentCount: { bsonType: "int", minimum: 0 },
            viewCount: { bsonType: "int", minimum: 0 },
            shareCount: { bsonType: "int", minimum: 0 }
          }
        },
        moderation: {
          bsonType: "object",
          properties: {
            status: {
              bsonType: "string",
              enum: ["PENDING", "APPROVED", "FLAGGED", "REMOVED"]
            },
            flagCount: { bsonType: "int", minimum: 0 },
            flagReasons: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            moderatedBy: { bsonType: "string" },
            moderatedAt: { bsonType: "date" },
            moderationNote: { bsonType: "string" }
          }
        },
        isSticky: {
          bsonType: "bool",
          description: "Whether post is pinned to top"
        },
        isLocked: {
          bsonType: "bool",
          description: "Whether comments are disabled"
        },
        isDeleted: {
          bsonType: "bool",
          description: "Whether post is soft deleted"
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Anonymous Comments Collection
db.createCollection("comments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["content", "authorId", "postId"],
      properties: {
        content: {
          bsonType: "string",
          maxLength: 2000,
          description: "Comment content"
        },
        authorId: {
          bsonType: "string",
          description: "Anonymous ID of comment author"
        },
        postId: {
          bsonType: "objectId",
          description: "ID of the post this comment belongs to"
        },
        parentCommentId: {
          bsonType: "objectId",
          description: "ID of parent comment for nested comments"
        },
        depth: {
          bsonType: "int",
          minimum: 0,
          maximum: 10,
          description: "Nesting depth of comment"
        },
        engagement: {
          bsonType: "object",
          properties: {
            upvotes: { bsonType: "int", minimum: 0 },
            downvotes: { bsonType: "int", minimum: 0 },
            replyCount: { bsonType: "int", minimum: 0 }
          }
        },
        moderation: {
          bsonType: "object",
          properties: {
            status: {
              bsonType: "string",
              enum: ["PENDING", "APPROVED", "FLAGGED", "REMOVED"]
            },
            flagCount: { bsonType: "int", minimum: 0 },
            flagReasons: {
              bsonType: "array",
              items: { bsonType: "string" }
            }
          }
        },
        isDeleted: {
          bsonType: "bool",
          description: "Whether comment is soft deleted"
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Anonymous Votes Collection (for posts and comments)
db.createCollection("votes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "type"],
      properties: {
        userId: {
          bsonType: "string",
          description: "Anonymous ID of voter"
        },
        postId: {
          bsonType: "objectId",
          description: "ID of post being voted on"
        },
        commentId: {
          bsonType: "objectId",
          description: "ID of comment being voted on"
        },
        type: {
          bsonType: "string",
          enum: ["UPVOTE", "DOWNVOTE"],
          description: "Type of vote"
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Anonymous Messages Collection (for private messaging)
db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["senderId", "recipientId", "content"],
      properties: {
        senderId: {
          bsonType: "string",
          description: "Anonymous ID of sender"
        },
        recipientId: {
          bsonType: "string",
          description: "Anonymous ID of recipient"
        },
        conversationId: {
          bsonType: "string",
          description: "Unique conversation identifier"
        },
        content: {
          bsonType: "string",
          maxLength: 5000,
          description: "Message content"
        },
        messageType: {
          bsonType: "string",
          enum: ["TEXT", "IMAGE", "FILE"],
          description: "Type of message"
        },
        mediaUrl: {
          bsonType: "string",
          description: "URL of attached media"
        },
        isRead: {
          bsonType: "bool",
          description: "Whether message has been read"
        },
        readAt: {
          bsonType: "date",
          description: "When message was read"
        },
        isDeleted: {
          bsonType: "bool",
          description: "Whether message is deleted"
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Moderation Logs Collection
db.createCollection("moderation_logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["moderatorId", "action", "targetType", "targetId"],
      properties: {
        moderatorId: {
          bsonType: "string",
          description: "Anonymous ID of moderator"
        },
        action: {
          bsonType: "string",
          enum: ["APPROVE", "REMOVE", "FLAG", "BAN", "WARN", "LOCK", "STICKY"],
          description: "Moderation action taken"
        },
        targetType: {
          bsonType: "string",
          enum: ["POST", "COMMENT", "USER", "COMMUNITY"],
          description: "Type of target being moderated"
        },
        targetId: {
          bsonType: "string",
          description: "ID of target being moderated"
        },
        reason: {
          bsonType: "string",
          description: "Reason for moderation action"
        },
        notes: {
          bsonType: "string",
          description: "Additional moderation notes"
        },
        communityId: {
          bsonType: "objectId",
          description: "Community where action was taken"
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Create indexes for optimal performance

// Anonymous Users indexes
db.anonymous_users.createIndex({ "anonymousId": 1 }, { unique: true });
db.anonymous_users.createIndex({ "hashedCredentials": 1 });
db.anonymous_users.createIndex({ "institutionCategory": 1 });
db.anonymous_users.createIndex({ "graduationYearRange": 1 });
db.anonymous_users.createIndex({ "lastActiveAt": -1 });

// Communities indexes
db.communities.createIndex({ "slug": 1 }, { unique: true });
db.communities.createIndex({ "type": 1 });
db.communities.createIndex({ "category": 1 });
db.communities.createIndex({ "tags": 1 });
db.communities.createIndex({ "memberCount": -1 });
db.communities.createIndex({ "createdAt": -1 });
db.communities.createIndex({ "name": "text", "description": "text" });

// Posts indexes
db.posts.createIndex({ "communityId": 1, "createdAt": -1 });
db.posts.createIndex({ "authorId": 1 });
db.posts.createIndex({ "tags": 1 });
db.posts.createIndex({ "engagement.upvotes": -1 });
db.posts.createIndex({ "engagement.commentCount": -1 });
db.posts.createIndex({ "moderation.status": 1 });
db.posts.createIndex({ "isSticky": 1, "createdAt": -1 });
db.posts.createIndex({ "title": "text", "content": "text" });

// Comments indexes
db.comments.createIndex({ "postId": 1, "createdAt": 1 });
db.comments.createIndex({ "authorId": 1 });
db.comments.createIndex({ "parentCommentId": 1 });
db.comments.createIndex({ "depth": 1 });
db.comments.createIndex({ "engagement.upvotes": -1 });

// Votes indexes
db.votes.createIndex({ "userId": 1, "postId": 1 }, { unique: true, sparse: true });
db.votes.createIndex({ "userId": 1, "commentId": 1 }, { unique: true, sparse: true });
db.votes.createIndex({ "postId": 1 });
db.votes.createIndex({ "commentId": 1 });

// Messages indexes
db.messages.createIndex({ "conversationId": 1, "createdAt": 1 });
db.messages.createIndex({ "senderId": 1 });
db.messages.createIndex({ "recipientId": 1 });
db.messages.createIndex({ "isRead": 1 });

// Moderation logs indexes
db.moderation_logs.createIndex({ "moderatorId": 1 });
db.moderation_logs.createIndex({ "targetType": 1, "targetId": 1 });
db.moderation_logs.createIndex({ "communityId": 1 });
db.moderation_logs.createIndex({ "createdAt": -1 });

// Create compound indexes for common queries
db.posts.createIndex({ "communityId": 1, "moderation.status": 1, "createdAt": -1 });
db.posts.createIndex({ "authorId": 1, "isDeleted": 1, "createdAt": -1 });
db.comments.createIndex({ "postId": 1, "isDeleted": 1, "createdAt": 1 });

print("MongoDB schema and indexes created successfully for anonymous communities");
