/*
  Warnings:

  - Added the required column `address` to the `ContactPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ContactPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ContactPage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heroTitle" TEXT NOT NULL,
    "heroParagraph" TEXT NOT NULL,
    "talkTitle" TEXT NOT NULL,
    "talkDescription" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContactPage" ("heroParagraph", "heroTitle", "id", "talkDescription", "talkTitle", "updatedAt") SELECT "heroParagraph", "heroTitle", "id", "talkDescription", "talkTitle", "updatedAt" FROM "ContactPage";
DROP TABLE "ContactPage";
ALTER TABLE "new_ContactPage" RENAME TO "ContactPage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
