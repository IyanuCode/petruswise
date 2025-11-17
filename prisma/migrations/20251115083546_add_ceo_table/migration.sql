-- CreateTable
CREATE TABLE "Ceo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "quote" TEXT,
    "aboutPageId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ceo_aboutPageId_fkey" FOREIGN KEY ("aboutPageId") REFERENCES "AboutPage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
