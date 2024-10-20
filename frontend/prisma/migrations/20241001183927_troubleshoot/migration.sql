/*
  Warnings:

  - You are about to drop the column `description` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Recipe` table. All the data in the column will be lost.
  - The `userId` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `label` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDaily` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalNutrients` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uri` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ingredients` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "description",
DROP COLUMN "steps",
DROP COLUMN "title",
ADD COLUMN     "calories" DOUBLE PRECISION,
ADD COLUMN     "cautions" TEXT[],
ADD COLUMN     "cuisineType" TEXT[],
ADD COLUMN     "dietLabels" TEXT[],
ADD COLUMN     "dishType" TEXT[],
ADD COLUMN     "healthLabels" TEXT[],
ADD COLUMN     "image" TEXT,
ADD COLUMN     "ingredientLines" TEXT[],
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "mealType" TEXT[],
ADD COLUMN     "source" TEXT,
ADD COLUMN     "totalDaily" JSONB NOT NULL,
ADD COLUMN     "totalNutrients" JSONB NOT NULL,
ADD COLUMN     "totalTime" INTEGER,
ADD COLUMN     "uri" TEXT NOT NULL,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "yield" INTEGER,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" JSONB NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
