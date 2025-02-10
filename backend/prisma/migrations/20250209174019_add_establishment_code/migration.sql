/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Establishment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Establishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Establishment" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Establishment_code_key" ON "Establishment"("code");
