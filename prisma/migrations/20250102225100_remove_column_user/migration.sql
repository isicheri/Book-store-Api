/*
  Warnings:

  - You are about to drop the column `userId` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_userId_fkey";

-- AlterTable
ALTER TABLE "pages" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "userId";
