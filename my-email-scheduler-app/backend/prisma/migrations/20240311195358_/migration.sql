/*
  Warnings:

  - Added the required column `dateToBeSendAt` to the `email_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_templates" ADD COLUMN     "dateToBeSendAt" TIMESTAMP(3) NOT NULL;
