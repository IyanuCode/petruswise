-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT 'logo.png',
    "role" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "contactPageId" INTEGER,
    CONSTRAINT "ContactInfo_contactPageId_fkey" FOREIGN KEY ("contactPageId") REFERENCES "ContactPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ContactInfo" ("contactInfo", "contactPageId", "id", "name", "role") SELECT "contactInfo", "contactPageId", "id", "name", "role" FROM "ContactInfo";
DROP TABLE "ContactInfo";
ALTER TABLE "new_ContactInfo" RENAME TO "ContactInfo";
CREATE TABLE "new_ContactPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroParagraph" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL DEFAULT 'logo.png',
    "talkTitle" TEXT NOT NULL,
    "talkDescription" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContactPage" ("address", "email", "heroParagraph", "heroTitle", "id", "phone", "slug", "talkDescription", "talkTitle", "updatedAt") SELECT "address", "email", "heroParagraph", "heroTitle", "id", "phone", "slug", "talkDescription", "talkTitle", "updatedAt" FROM "ContactPage";
DROP TABLE "ContactPage";
ALTER TABLE "new_ContactPage" RENAME TO "ContactPage";
CREATE UNIQUE INDEX "ContactPage_slug_key" ON "ContactPage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
