import { Controller, Get } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get('/init')
  initData() {
    return this.certificateService.createCertificateTemplate();
  }
  @Get('/template')
  getTemplate() {
    return this.certificateService.getTemplate();
  }
}
