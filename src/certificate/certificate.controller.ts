import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get('/init')
  initData() {
    return this.certificateService.init();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/template')
  getTemplate(@Req() request: Request) {
    return this.certificateService.getTemplate(request);
  }
}
