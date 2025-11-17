/*
  Warnings:

  - A unique constraint covering the columns `[aboutPageId]` on the table `Ceo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ceo_aboutPageId_key" ON "Ceo"("aboutPageId");
