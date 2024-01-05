import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Organization } from 'src/organization/entities/organization.entity';
import { CreateCertificateCollectionDTO } from './dto/createCertificateCollection';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get('/init')
  initData() {
    return this.certificateService.init();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/organization/:organizationId/template')
  getOrganizationCertificateTemplate(
    @Req() request: Request,
    @Param('organizationId') organizationId: string,
  ) {
    return this.certificateService.getCertificateTemplate(
      request,
      organizationId,
    );
  }

  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Post('/collection/create')
  createOrganizationCertificate(
    @Req() request: Request,
    @Body() createCertificateCollection: CreateCertificateCollectionDTO,
  ) {
    return this.certificateService.createOrganizationCertificate(
      request,
      createCertificateCollection,
    );
  }
}
