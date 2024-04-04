-- CreateEnum
CREATE TYPE "ReportCategory" AS ENUM ('Spam', 'SexuallyInappropriate', 'ExtremePolitical', 'PromotingViolence', 'Harassment', 'SuicideOrSelfInjury', 'FalseInformation', 'IntellectualPropertyViolation', 'Other');

-- CreateEnum
CREATE TYPE "QuestionReportCategory" AS ENUM ('Spam', 'SexuallyInappropriate', 'ExtremePolitical', 'Duplicate', 'SuicideOrSelfInjury', 'Other');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(35) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "body" JSONB NOT NULL,
    "tags" VARCHAR(32) NOT NULL,
    "category" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "userID" INTEGER,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogComments" (
    "id" SERIAL NOT NULL,
    "body" VARCHAR(8192) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER,
    "blogPostId" INTEGER,

    CONSTRAINT "BlogComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follower" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "followerId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" INTEGER,
    "blogPostId" INTEGER,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dislikes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" INTEGER,
    "blogPostId" INTEGER,

    CONSTRAINT "Dislikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "body" JSON NOT NULL DEFAULT '{}',
    "category" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionReply" (
    "id" SERIAL NOT NULL,
    "body" VARCHAR(8192) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER,
    "questionId" INTEGER,

    CONSTRAINT "QuestionReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionUpvote" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionId" INTEGER,

    CONSTRAINT "QuestionUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionDownvote" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionId" INTEGER,

    CONSTRAINT "QuestionDownvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportBlogs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" INTEGER,
    "category" VARCHAR(32) NOT NULL,
    "description" VARCHAR(512),
    "blogPostId" INTEGER,

    CONSTRAINT "ReportBlogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportQuestions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionId" INTEGER,

    CONSTRAINT "ReportQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "BlogPost_userID_idx" ON "BlogPost"("userID");

-- CreateIndex
CREATE INDEX "BlogComments_blogPostId_idx" ON "BlogComments"("blogPostId");

-- CreateIndex
CREATE INDEX "Follower_userId_idx" ON "Follower"("userId");

-- CreateIndex
CREATE INDEX "Likes_blogPostId_idx" ON "Likes"("blogPostId");

-- CreateIndex
CREATE INDEX "Dislikes_blogPostId_idx" ON "Dislikes"("blogPostId");

-- CreateIndex
CREATE INDEX "Question_userId_idx" ON "Question"("userId");

-- CreateIndex
CREATE INDEX "QuestionReply_questionId_idx" ON "QuestionReply"("questionId");

-- CreateIndex
CREATE INDEX "QuestionUpvote_questionId_idx" ON "QuestionUpvote"("questionId");

-- CreateIndex
CREATE INDEX "QuestionDownvote_questionId_idx" ON "QuestionDownvote"("questionId");

-- CreateIndex
CREATE INDEX "ReportBlogs_blogPostId_idx" ON "ReportBlogs"("blogPostId");

-- CreateIndex
CREATE INDEX "ReportQuestions_questionId_idx" ON "ReportQuestions"("questionId");
