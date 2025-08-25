import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    avatar: String
    institution: String!
    graduationYear: Int!
    program: String!
    bio: String
    isVerified: Boolean!
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  enum UserRole {
    STUDENT
    ALUMNI
    FACULTY
    ADMIN
  }

  type Post {
    id: ID!
    content: String!
    author: User!
    likes: Int!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
  }

  type Community {
    id: ID!
    name: String!
    description: String
    memberCount: Int!
    isAnonymous: Boolean!
    createdAt: String!
  }

  type Job {
    id: ID!
    title: String!
    company: String!
    description: String!
    location: String
    salaryRange: String
    requirements: [String!]!
    postedBy: User!
    createdAt: String!
  }

  type Query {
    me: User
    users(limit: Int, offset: Int): [User!]!
    posts(limit: Int, offset: Int): [Post!]!
    communities: [Community!]!
    jobs(limit: Int, offset: Int): [Job!]!
    
    # Search
    searchUsers(query: String!): [User!]!
    searchPosts(query: String!): [Post!]!
    searchJobs(query: String!): [Job!]!
  }

  type Mutation {
    # User mutations
    updateProfile(input: UpdateProfileInput!): User!
    
    # Post mutations
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
    likePost(postId: ID!): Boolean!
    
    # Comment mutations
    createComment(input: CreateCommentInput!): Comment!
    
    # Community mutations
    createCommunity(input: CreateCommunityInput!): Community!
    joinCommunity(communityId: ID!): Boolean!
    leaveCommunity(communityId: ID!): Boolean!
    
    # Job mutations
    createJob(input: CreateJobInput!): Job!
    applyToJob(jobId: ID!): Boolean!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    bio: String
    avatar: String
  }

  input CreatePostInput {
    content: String!
    communityId: ID
  }

  input UpdatePostInput {
    content: String!
  }

  input CreateCommentInput {
    content: String!
    postId: ID!
  }

  input CreateCommunityInput {
    name: String!
    description: String
    isAnonymous: Boolean!
  }

  input CreateJobInput {
    title: String!
    company: String!
    description: String!
    location: String
    salaryRange: String
    requirements: [String!]!
  }
`;
