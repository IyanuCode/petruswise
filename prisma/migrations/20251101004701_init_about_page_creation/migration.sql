/*
  Warnings:

  - You are about to drop the `About` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `aboutId` on the `Staff` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "About";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AboutPage" (
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

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "imageUrl" TEXT,
    "aboutPageId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Staff_aboutPageId_fkey" FOREIGN KEY ("aboutPageId") REFERENCES "AboutPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("bio", "createdAt", "id", "imageUrl", "name", "role") SELECT "bio", "createdAt", "id", "imageUrl", "name", "role" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
