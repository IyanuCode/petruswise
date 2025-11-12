/*
  Warnings:

  - Made the column `heroImage` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `heroParagraph` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `heroTitle` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mission` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ourStoryCont` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ourStoryIntro` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vision` on table `AboutPage` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AboutPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroParagraph" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "ourStoryIntro" TEXT NOT NULL,
    "ourStoryCont" TEXT NOT NULL,
    "ourStoryEnding" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AboutPage" ("heroImage", "heroParagraph", "heroTitle", "id", "mission", "ourStoryCont", "ourStoryEnding", "ourStoryIntro", "slug", "updatedAt", "vision") SELECT "heroImage", "heroParagraph", "heroTitle", "id", "mission", "ourStoryCont", "ourStoryEnding", "ourStoryIntro", "slug", "updatedAt", "vision" FROM "AboutPage";
DROP TABLE "AboutPage";
ALTER TABLE "new_AboutPage" RENAME TO "AboutPage";
CREATE UNIQUE INDEX "AboutPage_slug_key" ON "AboutPage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
