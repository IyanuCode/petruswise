/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `experience` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "tooltip" TEXT,
    "bio" TEXT,
    "image" TEXT,
    "overlayText" TEXT,
    "aboutPageId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Staff_aboutPageId_fkey" FOREIGN KEY ("aboutPageId") REFERENCES "AboutPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("aboutPageId", "bio", "createdAt", "id", "name", "role") SELECT "aboutPageId", "bio", "createdAt", "id", "name", "role" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
