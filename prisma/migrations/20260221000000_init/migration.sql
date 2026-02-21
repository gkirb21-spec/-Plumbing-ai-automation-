CREATE TYPE "LeadType" AS ENUM ('quote', 'booking');
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'booked', 'closed');
CREATE TABLE "Lead" (
  "id" TEXT PRIMARY KEY,
  "type" "LeadType" NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phoneRaw" TEXT NOT NULL,
  "phoneE164" TEXT,
  "city" TEXT NOT NULL,
  "serviceSlug" TEXT,
  "message" TEXT NOT NULL,
  "preferredDate" TEXT,
  "timeWindow" TEXT,
  "status" "LeadStatus" NOT NULL DEFAULT 'new',
  "notes" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "Service" ("id" TEXT PRIMARY KEY, "slug" TEXT UNIQUE NOT NULL, "title" TEXT NOT NULL, "description" TEXT NOT NULL, "body" TEXT NOT NULL);
CREATE TABLE "ServiceArea" ("id" TEXT PRIMARY KEY, "city" TEXT UNIQUE NOT NULL, "slug" TEXT UNIQUE NOT NULL, "seoContent" TEXT NOT NULL);
CREATE TABLE "Review" ("id" TEXT PRIMARY KEY, "author" TEXT NOT NULL, "rating" INTEGER NOT NULL, "content" TEXT NOT NULL, "isSample" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW());
CREATE TABLE "FAQ" ("id" TEXT PRIMARY KEY, "question" TEXT NOT NULL, "answer" TEXT NOT NULL);
CREATE TABLE "BlogPost" ("id" TEXT PRIMARY KEY, "slug" TEXT UNIQUE NOT NULL, "title" TEXT NOT NULL, "excerpt" TEXT NOT NULL, "content" TEXT NOT NULL, "published" BOOLEAN NOT NULL DEFAULT true, "publishedAt" TIMESTAMP NOT NULL DEFAULT NOW());
