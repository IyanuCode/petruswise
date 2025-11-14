-- CreateTable
CREATE TABLE "ServicePage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heroImage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ServiceData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "prevCloudinaryImgId" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "servicePageId" INTEGER NOT NULL,
    CONSTRAINT "ServiceData_servicePageId_fkey" FOREIGN KEY ("servicePageId") REFERENCES "ServicePage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceData_slug_key" ON "ServiceData"("slug");
