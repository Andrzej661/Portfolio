import { JwtAuthGuard } from './../auth/jwt.guard';
import { ParseStringUrlToNumber } from './parserStringUrltoNumber';
// In your EmailTemplatesController file

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';
import {
  CreateEmailTemplateDto,
  SendEmailDto,
  SendEmailToDevDto,
  UpdateEmailTemplateDto,
} from './dto/emailTemplate.dto';
import { Request, Response } from 'express';
@UseGuards(JwtAuthGuard)
@Controller('email-templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplatesService: EmailTemplatesService) {}
  //creating tempalte
  @Post('new')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() createEmailTemplateDto: CreateEmailTemplateDto,
  ): Promise<any> {
    return this.emailTemplatesService.createEmailTemplate(
      createEmailTemplateDto,
    );
  }
  //geting template

  @Get(':id')
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  getEmailTemplateById(
    @Param() { id }: ParseStringUrlToNumber,
    @Req() req: Request,
  ) {
    return this.emailTemplatesService.getEmailTemplateById(id, req);
  }
  @Post('library')
  async getAllEmailTemplatesByUser(@Req() req: Request, @Res() res: Response) {
    try {
      const emailTemplatesDto =
        await this.emailTemplatesService.getEmailTemplatesByUserId(req);
      return res.json(emailTemplatesDto); // Use res.json for sending back JSON response
    } catch (error) {
      console.error('Failed to retrieve email templates', error);
      // Handle the error accordingly, perhaps sending an HTTP 500 response
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateEmailTemplate(
    @Param() { id }: ParseStringUrlToNumber,
    @Body()
    updateEmailTemplateDto: UpdateEmailTemplateDto,
  ) {
    return this.emailTemplatesService.updateEmailTemplate(
      id,
      updateEmailTemplateDto,
    );
  }

  @Post('delete') // Assuming the use of a POST request for deletion for this example
  // @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmailTemplate(
    @Body('id') id: number,
    @Req() req: Request,
  ): Promise<void> {
    // Placeholder for userId extraction logic from cookie
    const userId = 'this.extractUserIdFromCookie(request);'; // Implement this method based on your auth logic

    await this.emailTemplatesService.deleteEmailTemplateById(id, req);
  }

  @Post('send')
  async sendEmail(@Req() req: Request, @Body() sendEmailDto: SendEmailDto) {
    // Extract token from cookies
    const token = req.cookies['token'];
    if (!token) {
      throw new BadRequestException('Token not provided');
    }

    // Assume a method in your service validates the token and retrieves the necessary user or template details
    const { templateId, emailAddresses } = sendEmailDto;
    await this.emailTemplatesService.sendTestEmailWithTemplate(
      token,
      templateId,
      emailAddresses,
    );
    return { message: 'Emails queued for sending' };
  }
  @Post('send-dev')
  async sendMailToDeveloper(
    @Req() req: Request,
    @Body() sendEmailToDevDto: SendEmailToDevDto,
  ) {
    // Extract token from cookies
    const token = req.cookies['token'];
    if (!token && !sendEmailToDevDto.messageMail) {
      throw new BadRequestException('Token not provided');
    }
    console.log(sendEmailToDevDto.messageMail);
    // Assume a method in your service validates the token and retrieves the necessary user or template details
    await this.emailTemplatesService.sendMailToDeveloper(
      token,
      sendEmailToDevDto.messageMail,
    );
    return { message: 'Emails queued for sending' };
  }
}
