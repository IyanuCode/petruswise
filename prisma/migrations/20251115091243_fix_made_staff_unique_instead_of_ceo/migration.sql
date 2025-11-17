/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Ceo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Staff_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ceo_name_key" ON "Ceo"("name");
