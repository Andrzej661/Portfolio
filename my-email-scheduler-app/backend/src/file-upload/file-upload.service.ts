import { EmailTemplatesService } from './../email-templates/email-templates.service';
import { Injectable } from '@nestjs/common';
import * as AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

@Injectable()
export class FileUploadService {
  public readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });

  // constructor(private emailTemplatesService: EmailTemplatesService) {}
  constructor() {}
  async getTitleFromHtml(htmlContent: string): Promise<string> {
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch.length > 1) {
      return titleMatch[1];
    } else {
      return 'Title not found';
    }
  }
  async extractZip(fileBuffer: Buffer, extractPath: string): Promise<string[]> {
    const zip = new AdmZip(fileBuffer);
    const zipEntries = zip.getEntries(); // Get all entries (files) in the ZIP

    zip.extractAllTo(extractPath, true);

    // Return an array of file names from the ZIP
    return zipEntries.map((entry) => entry.entryName);
  }
  async readFileContent(filePath: string): Promise<string> {
    return readFile(filePath, { encoding: 'utf8' });
  }
  // async readFilesIntoMemory(
  //   filePaths: string[],
  // ): Promise<Express.Multer.File[]> {
  //   return Promise.all(
  //     filePaths.map(async (filePath) => {
  //       const buffer = await readFile(filePath);
  //       return {
  //         buffer,
  //         originalname: path.basename(filePath),
  //         // Add other properties as needed, e.g., mimetype, depending on your upload service's requirements
  //       } as Express.Multer.File; // Casting to Multer.File for demonstration; adjust as needed
  //     }),
  //   );
  // }
  async upload(
    filePath: string,
    fileName: string,
    file: Buffer,
    userId: string,
    projectName: string,
  ) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${filePath}/${userId}/${projectName}/${fileName}`,
        Body: file,
      }),
    );
    const response = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${filePath}/${userId}/${projectName}/${fileName}`;
    return response;
  }
  async htmlAdjuster(htmlValue: string, ImgNames: string[], ImgUrls: string[]) {
    //  Remove script tags
    let updatedHtml = htmlValue.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      '',
    );

    ImgNames.forEach((name, index) => {
      const regex = new RegExp(`src=["'](.*/)?${name}["']`, 'g');
      const replacement = `src="${ImgUrls[index]}"`;
      updatedHtml = updatedHtml.replace(regex, replacement);
    });

    return updatedHtml;
  }
}
export const s3Client = new FileUploadService().s3Client;
