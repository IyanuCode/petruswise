/*
  Warnings:

  - You are about to drop the column `address` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `heroImage` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `heroSubtitle` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `keyContacts` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `partnerLogos` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `talkText` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `testimonials` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `emoji` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `talkDescription` to the `ContactPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quote` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "contactPageId" INTEGER,
    CONSTRAINT "ContactInfo_contactPageId_fkey" FOREIGN KEY ("contactPageId") REFERENCES "ContactPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "contactPageId" INTEGER,
    CONSTRAINT "Partner_contactPageId_fkey" FOREIGN KEY ("contactPageId") REFERENCES "ContactPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heroTitle" TEXT NOT NULL,
    "heroParagraph" TEXT NOT NULL,
    "talkTitle" TEXT NOT NULL,
    "talkDescription" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContactPage" ("heroParagraph", "heroTitle", "id", "talkTitle", "updatedAt") SELECT "heroParagraph", "heroTitle", "id", "talkTitle", "updatedAt" FROM "ContactPage";
DROP TABLE "ContactPage";
ALTER TABLE "new_ContactPage" RENAME TO "ContactPage";
CREATE TABLE "new_Testimonial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "contactPageId" INTEGER,
    CONSTRAINT "Testimonial_contactPageId_fkey" FOREIGN KEY ("contactPageId") REFERENCES "ContactPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Testimonial" ("id", "name", "role") SELECT "id", "name", "role" FROM "Testimonial";
DROP TABLE "Testimonial";
ALTER TABLE "new_Testimonial" RENAME TO "Testimonial";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
