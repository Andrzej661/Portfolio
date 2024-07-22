import { IsString } from 'class-validator';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  UseGuards,
  Get,
  Param,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { EmailTemplatesService } from '../email-templates/email-templates.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { v4 as uuidv4 } from 'uuid';
import { LoginStatusProps } from 'src/auth/types';
import { jwtDecode } from 'jwt-decode';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
@Controller('file-upload')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly emailTemplatesService: EmailTemplatesService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  // @UseGuards(JwtAuthGuard)
  @Post('upload-zip')
  @UseInterceptors(FileInterceptor('file'))
  async uploadZip(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Call the function to delete all files
    const extractPath = './uploads/extracted/';
    const files = await this.fileUploadService.extractZip(
      file.buffer,
      extractPath,
    );
    function deleteFiles(directory) {
      const files = fs.readdirSync(directory);

      for (const file of files) {
        fs.unlinkSync(directory);
      }
    }
    const htmlFile = files.find((f) => f.endsWith('.html'));
    const imageFiles = files.filter((f) => f.match(/\.(jpeg|jpg|gif|png)$/i));

    const imageUrls = []; // Initialize an array to store the URLs

    if (!htmlFile) {
      return res
        .status(400)
        .json({ message: 'No HTML file found in the ZIP.' });
    }

    const htmlContentPath = `${extractPath}/${htmlFile}`;
    const htmlContent =
      await this.fileUploadService.readFileContent(htmlContentPath);
    const projectName = file.originalname.split('.').slice(0, -1).join('.'); // Removes the file extension

    const token = req.cookies['token'];
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }

    this.jwt.verify(token);
    const decodedToken = jwtDecode(token) as LoginStatusProps;
    const id = decodedToken.id as string;
    const userId = id;

    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new BadRequestException('Invalid token');
    }

    const extractPathAWS = 'uploads';
    let fileNameWithUuids = [];
    for (const imageFile of imageFiles) {
      const fileNameWithUuid = `${uuidv4()}-${imageFile}`; // Prepend a UUID to the filename
      const fileBuffer = fs.readFileSync(`${extractPath}${imageFile}`);
      const imageUrl = await this.fileUploadService.upload(
        extractPathAWS,
        fileNameWithUuid, // Use the modified fileNameWithUuid here
        fileBuffer,
        userId,
        projectName,
      );
      imageUrls.push(imageUrl);
      fileNameWithUuids.push(fileNameWithUuid);
    }
    const adjustedHtmlValue = await this.fileUploadService.htmlAdjuster(
      htmlContent,
      imageFiles,
      imageUrls,
    );
    let dateToBeSendAt = new Date('2023-01-01T10:00:00');
    const projectThumbnail =
      await this.emailTemplatesService.createScreenshot(adjustedHtmlValue);
    const thumbnailFileNameWithUuid = `thumbnail-${uuidv4()}.png`;
    const projectThumbnailUrl = await this.fileUploadService.upload(
      extractPathAWS,
      thumbnailFileNameWithUuid,
      projectThumbnail,
      userId,
      projectName,
    );
    const imageFileNamesWithThumbnail = [
      ...fileNameWithUuids,
      thumbnailFileNameWithUuid,
    ];
    let emailTitle =
      await this.fileUploadService.getTitleFromHtml(adjustedHtmlValue);
    try {
      const emailTemplate =
        await this.emailTemplatesService.createEmailTemplate({
          userId,
          projectName,
          htmlContent: adjustedHtmlValue,
          imageNames: imageFileNamesWithThumbnail,
          imageUrls: imageUrls,
          dateToBeSendAt,
          projectThumbnailUrl,
          emailTitle,
        });
      await deleteFiles(extractPath);
      return res
        .status(201)
        .send({ message: 'EmailTemplateCreated', emailTemplate });
    } catch (err) {
      console.error('Error creating emailtempalte:', err);
    }
  }
}
