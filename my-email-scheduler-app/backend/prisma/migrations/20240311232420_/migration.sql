/*
  Warnings:

  - Added the required column `projectThumbnailUrl` to the `email_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_templates" ADD COLUMN     "projectThumbnailUrl" TEXT NOT NULL;
