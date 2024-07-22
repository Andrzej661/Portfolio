-- CreateTable
CREATE TABLE "email_templates" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "imageNames" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_templates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_templates" ADD CONSTRAINT "email_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
