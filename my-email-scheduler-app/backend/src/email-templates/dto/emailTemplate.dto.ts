import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateEmailTemplateDto {
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsString()
  public projectName: string;

  @IsString()
  public htmlContent: string;

  @IsArray()
  @IsString({ each: true })
  public imageNames: string[];
  @IsArray()
  @IsString({ each: true })
  public imageUrls: string[];
  @IsOptional()
  public dateToBeSendAt: Date;
  @IsOptional()
  public createdAt?: Date;
  @IsOptional()
  projectThumbnailUrl;
  @IsOptional()
  public emailTitle: string;
}
export class UpdateEmailTemplateDto {
  @IsNotEmpty()
  public id: number;

  @IsOptional()
  public userId: string;

  @IsString()
  public projectName: string;

  @IsString()
  public htmlContent: string;

  @IsOptional()
  public dateToBeSendAt: Date;
  @IsOptional()
  public updatedAt?: Date;
  @IsOptional()
  public emailTitle: string;
}
export class EmailTemplateProjectDto {
  @IsNotEmpty()
  public id: number;

  @IsString()
  public projectName: string;

  @IsOptional()
  public dateToBeSendAt: Date;
  @IsOptional()
  public projectThumbnailUrl: string;
  @IsOptional()
  public emailTitle: string;
  @IsOptional()
  public updatedAt?: Date;
}
export class EmailTemplateLibraryDto {
  @IsArray()
  EmailProjects: EmailTemplateProjectDto[];
}
export class SendEmailDto {
  @IsNumber()
  templateId: number;
  @IsOptional()
  @IsArray()
  emailAddresses: string[];
}
export class SendEmailToDevDto {
  @IsString()
  @IsNotEmpty()
  messageMail: string;
}
