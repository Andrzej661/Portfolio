-- AddForeignKey
ALTER TABLE "email_templates" ADD CONSTRAINT "email_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
