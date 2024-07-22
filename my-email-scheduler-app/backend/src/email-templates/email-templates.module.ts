import { Module } from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';
import { EmailTemplatesController } from './email-templates.controller';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the import path as necessary
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [EmailTemplatesController],
  providers: [EmailTemplatesService, PrismaService],
  exports: [EmailTemplatesService], // Make sure to export EmailTemplatesService
})
export class EmailTemplatesModule {}
