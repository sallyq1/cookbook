/*
  Warnings:

  - You are about to drop the column `authorId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_SavedRecipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_B_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "authorId",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "_SavedRecipes";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
