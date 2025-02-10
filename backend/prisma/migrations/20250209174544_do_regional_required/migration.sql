/*
  Warnings:

  - Made the column `regionalId` on table `Establishment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Establishment" DROP CONSTRAINT "Establishment_regionalId_fkey";

-- AlterTable
ALTER TABLE "Establishment" ALTER COLUMN "regionalId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_regionalId_fkey" FOREIGN KEY ("regionalId") REFERENCES "Regional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
