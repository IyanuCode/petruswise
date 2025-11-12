-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heroTitle" TEXT NOT NULL,
    "heroParagraph" TEXT,
    "heroImage" TEXT,
    "ourStoryIntro" TEXT,
    "ourStoryCont" TEXT,
    "ourStoryEnding" TEXT NOT NULL,
    "mission" TEXT,
    "vision" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "imageUrl" TEXT,
    "aboutId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Staff_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
