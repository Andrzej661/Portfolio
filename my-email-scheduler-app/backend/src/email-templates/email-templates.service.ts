// import {} from './../file-upload/file-upload.service';
import { DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
// In your EmailTemplatesService file
import { s3Client } from '../file-upload/file-upload.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the import path based on your project structure
import {
  CreateEmailTemplateDto,
  EmailTemplateLibraryDto,
  EmailTemplateProjectDto,
  UpdateEmailTemplateDto,
} from './dto/emailTemplate.dto';
import puppeteer from 'puppeteer';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from 'jwt-decode';
import { LoginStatusProps } from 'src/auth/types';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailTemplatesService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async createEmailTemplate(
    createEmailTemplateDto: CreateEmailTemplateDto,
  ): Promise<any> {
    return this.prisma.emailTemplate.create({
      data: {
        ...createEmailTemplateDto,
        // Ensure this matches the expected type
      },
    });
  }
  async createScreenshot(html: string) {
    try {
      // Launch a new browser instance
      const browser = await puppeteer.launch();
      // Open a new page
      const page = await browser.newPage();
      await page.setViewport({ width: 601, height: 800 });

      // Set the HTML content
      await page.setContent(html, {
        waitUntil: 'networkidle0', // Wait for all network connections to finish
      });
      // Take a screenshot of the page
      const screenshotBuffer = await page.screenshot({ fullPage: false });
      // Close the browser
      await browser.close();
      return screenshotBuffer;

      // Respond with the screenshot image
    } catch (error) {
      console.error('Error generating screenshot:', error);
    }
  }
  async getEmailTemplateById(id: number, req: Request): Promise<any> {
    const token = req.cookies['token'];
    if (!token) {
      console.error('no token provided');
    }
    try {
      this.jwt.verify(token);
      const decodedToken = jwtDecode(token) as LoginStatusProps;
      const userId = decodedToken.id as string;
      const emailTemplate = this.prisma.emailTemplate.findUniqueOrThrow({
        where: {
          id,
          userId,
        },
      });
      if (!emailTemplate) {
        throw new NotFoundException();
      }
      return emailTemplate;
    } catch (error) {
      // Handle or log the error
      console.error('Error retrieving email templates', error);
      throw new Error('Failed to retrieve email templates');
    }
  }
  async getEmailTemplatesByUserId(
    req: Request,
  ): Promise<EmailTemplateLibraryDto> {
    const token = req.cookies['token'];
    if (!token) {
      console.error('no token provided');
    }
    try {
      this.jwt.verify(token);
      const decodedToken = jwtDecode(token) as LoginStatusProps;
      const userId = decodedToken.id as string;
      const emailTemplates = await this.prisma.emailTemplate.findMany({
        where: { userId },
        select: {
          id: true,
          projectName: true,
          dateToBeSendAt: true, // Assuming this field exists in your Prisma model
          projectThumbnailUrl: true,
          updatedAt: true,

          // Make sure this matches your Prisma model's field
          // Note: Only select fields that exist in your Prisma model and are needed for EmailTemplateProjectDto
        },
      });

      const emailProjects = emailTemplates.map((template) => {
        let projectDto = new EmailTemplateProjectDto();
        projectDto.id = template.id;
        projectDto.projectName = template.projectName;
        projectDto.dateToBeSendAt = template.dateToBeSendAt;
        projectDto.projectThumbnailUrl = template.projectThumbnailUrl;
        projectDto.updatedAt = template.updatedAt;
        return projectDto;
      });
      return { EmailProjects: emailProjects }; // Assuming EmailProjects is the correct field name as per your DTO definition
    } catch (error) {
      // Handle or log the error
      console.error('Error retrieving email templates', error);
      throw new Error('Failed to retrieve email templates');
    }
  }
  async updateEmailTemplate(
    id: number,
    updateEmailTemplateDto: UpdateEmailTemplateDto,
  ): Promise<any> {
    let updatedEmailTemplate = this.prisma.emailTemplate.update({
      where: { id },

      data: { ...updateEmailTemplateDto },
      // Ensure this matches the expected type
    });
    // const newThumbnail = this.createScreenshot(
    //   updateEmailTemplateDto.htmlContent,
    // );
    // const newThumbnailUrl = this.fileUploadService.upload("thumbnails",
    //   "updatedthumbnial",
    //   newThumbnail,
    //   userId
    //   projectName);
    return updatedEmailTemplate;
  }

  async deleteEmailTemplateById(
    id: number | string,
    req: Request,
  ): Promise<void> {
    // Placeholder for checking if EmailTemplate with given id belongs to the user with given userId
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid ID format: ${id}.`);
    }
    const token = req.cookies['token'];
    if (!token) {
      console.error('no token provided');
    }
    this.jwt.verify(token);
    const decodedToken = jwtDecode(token) as LoginStatusProps;
    const userId = decodedToken.id as string;

    const emailTemplate = await this.prisma.emailTemplate.findUniqueOrThrow({
      where: {
        id: numericId,
        userId, // Assuming your EmailTemplate model has a userId field
      },
    });

    if (!emailTemplate) {
      throw new NotFoundException(
        `EmailTemplate with ID ${id} not found or does not belong to the user.`,
      );
    }
    // Removed 'thumbnail' from the array

    for (const fileName of emailTemplate.imageNames) {
      try {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${userId}/${emailTemplate.projectName}/${fileName}`,
          }),
        );
        console.log(`Successfully deleted ${fileName} from S3.`);
      } catch (error) {
        console.error(`Failed to delete ${fileName} from S3:`, error);
      }
    }
    const listedObjects = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: `uploads/${userId}/${emailTemplate.projectName}/`,
      }),
    );
    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log(
        `The directory: uploads/${userId}/${emailTemplate.projectName}/ is now empty.`,
      );
      // Optionally, delete the directory if your S3 setup and use case require it.
      // Note: S3 does not require explicit directory deletion since directories are virtual in S3.
    } else {
      console.log(
        `There are still files in the directory: uploads/${userId}/${emailTemplate.projectName}/.`,
      );
    }

    // After ensuring all files are deleted, delete the email template from the database
    await this.prisma.emailTemplate.delete({ where: { id: numericId } });
    // await this.prisma.emailTemplate.delete({
    //   where: { id: numericId },
    // });
  }

  async sendTestEmailWithTemplate(
    token: string,
    templateId: number,
    emailAddresses: string[],
  ): Promise<void> {
    const numericId = Number(templateId);
    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid ID format: ${templateId}.`);
    }
    this.jwt.verify(token);
    const decodedToken = jwtDecode(token) as LoginStatusProps;
    const userId = decodedToken.id as string;
    const emailTemplate = await this.prisma.emailTemplate.findUniqueOrThrow({
      where: {
        id: numericId,
        userId, // Assuming your EmailTemplate model has a userId field
      },
    });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Your SMTP host
      port: 465, // Your SMTP port, 587 for TLS
      secure: true, // True for 465, false for other ports
      auth: {
        user: 'emailtestingapplication.havefun@gmail.com', // Your email
        pass: process.env.GOOGLE_SMTP_PASSWORD, // Your email password
      },
    });
    // emailAddresses.push('andrzejsuchecki12@gmail.com');
    const mailOptions = {
      from: 'emailtestingapplication.havefun@gmail.com', // Sender address
      to: emailAddresses,
      // emailAddresses.join(', '), // List of recipients
      subject: emailTemplate.emailTitle, // Subject line
      html: emailTemplate.htmlContent, // EmailTemplate htmlContent
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
    }
    // Actual implementation would involve more detailed logic
  }
  async sendMailToDeveloper(token: string, mess: string): Promise<void> {
    this.jwt.verify(token);
    const decodedToken = jwtDecode(token) as LoginStatusProps;
    const userId = decodedToken.id as string;
    if (!userId) throw new NotFoundException(`Invalid user.`);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Your SMTP host
      port: 465, // Your SMTP port, 587 for TLS
      secure: true, // True for 465, false for other ports
      auth: {
        user: 'emailtestingapplication.havefun@gmail.com', // Your email
        pass: process.env.GOOGLE_SMTP_PASSWORD, // Your email password
      },
    });
    // emailAddresses.push('andrzejsuchecki12@gmail.com');
    const mailOptions = {
      from: 'emailtestingapplication.havefun@gmail.com', // Sender address
      to: 'emailtestingapplication.havefun@gmail.com',
      // emailAddresses.join(', '), // List of recipients
      subject: 'Mess for dev', // Subject line
      text: 'from: ' + userId + '  ' + mess, // EmailTemplate htmlContent
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
    }
    // Actual implementation would involve more detailed logic
  }
}
