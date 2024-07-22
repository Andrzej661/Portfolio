import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { EmailTemplatesModule } from '../email-templates/email-templates.module'; // Adjust the import path as necessary

import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { EmailTemplatesService } from 'src/email-templates/email-templates.service';
@Module({
  imports: [EmailTemplatesModule, AuthModule], // Import EmailTemplatesModule here
  providers: [
    FileUploadService,
    AuthService,
    UsersService,
    EmailTemplatesService,
  ],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
