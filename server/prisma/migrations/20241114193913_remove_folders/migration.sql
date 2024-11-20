/*
  Warnings:

  - You are about to drop the column `folderId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the `Folders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_usersId_fkey";

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "folderId";

-- DropTable
DROP TABLE "Folders";
