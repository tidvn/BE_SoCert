import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('/init')
  initData() {
    return this.organizationService.initData();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:organizationId/template')
  getOrganizationCertificateTemplate(
    @Req() request: Request,
    @Param('organizationId') organizationId: string,
  ) {
    return this.organizationService.getCertificateTemplate(
      request,
      organizationId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:organizationId/certificate')
  getOrganizationCertificate(
    @Req() request: Request,
    @Param('organizationId') organizationId: string,
  ) {
    return this.organizationService.getCertificate(
      request,
      organizationId,
    );
  }


}
