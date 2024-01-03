import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('/init')
  initData() {
    return this.organizationService.initData();
  }
}
