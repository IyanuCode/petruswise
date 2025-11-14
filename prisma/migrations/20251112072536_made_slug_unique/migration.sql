/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ServicePage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ServicePage_slug_key" ON "ServicePage"("slug");
