/*
  Warnings:

  - Added the required column `slug` to the `ContactPage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroParagraph" TEXT NOT NULL,
    "talkTitle" TEXT NOT NULL,
    "talkDescription" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContactPage" ("address", "email", "heroParagraph", "heroTitle", "id", "phone", "talkDescription", "talkTitle", "updatedAt") SELECT "address", "email", "heroParagraph", "heroTitle", "id", "phone", "talkDescription", "talkTitle", "updatedAt" FROM "ContactPage";
DROP TABLE "ContactPage";
ALTER TABLE "new_ContactPage" RENAME TO "ContactPage";
CREATE UNIQUE INDEX "ContactPage_slug_key" ON "ContactPage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
