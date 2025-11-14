/*
  Warnings:

  - Added the required column `slug` to the `ServicePage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServicePage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ServicePage" ("createdAt", "heroImage", "id", "updatedAt") SELECT "createdAt", "heroImage", "id", "updatedAt" FROM "ServicePage";
DROP TABLE "ServicePage";
ALTER TABLE "new_ServicePage" RENAME TO "ServicePage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
