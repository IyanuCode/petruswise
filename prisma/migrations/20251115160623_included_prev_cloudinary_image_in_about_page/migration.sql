/*
  Warnings:

  - You are about to drop the column `image` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutPage" ADD COLUMN "prevCloudinaryImgId" TEXT;

-- AlterTable
ALTER TABLE "Ceo" ADD COLUMN "prevCloudinaryImgId" TEXT;

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
    "imageUrl" TEXT,
    "prevCloudinaryImgId" TEXT,
    "overlayText" TEXT,
    "aboutPageId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Staff_aboutPageId_fkey" FOREIGN KEY ("aboutPageId") REFERENCES "AboutPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("aboutPageId", "bio", "createdAt", "experience", "id", "name", "overlayText", "role", "tooltip") SELECT "aboutPageId", "bio", "createdAt", "experience", "id", "name", "overlayText", "role", "tooltip" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
