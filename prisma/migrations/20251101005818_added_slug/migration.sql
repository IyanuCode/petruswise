-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AboutPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT,
    "heroTitle" TEXT,
    "heroParagraph" TEXT,
    "heroImage" TEXT,
    "ourStoryIntro" TEXT,
    "ourStoryCont" TEXT,
    "ourStoryEnding" TEXT NOT NULL,
    "mission" TEXT,
    "vision" TEXT,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AboutPage" ("heroImage", "heroParagraph", "heroTitle", "id", "mission", "ourStoryCont", "ourStoryEnding", "ourStoryIntro", "updatedAt", "vision") SELECT "heroImage", "heroParagraph", "heroTitle", "id", "mission", "ourStoryCont", "ourStoryEnding", "ourStoryIntro", "updatedAt", "vision" FROM "AboutPage";
DROP TABLE "AboutPage";
ALTER TABLE "new_AboutPage" RENAME TO "AboutPage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
