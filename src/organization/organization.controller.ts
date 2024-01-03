import { Controller, Get } from '@nestjs/common';
import { OrganizationService } from './organization.service';

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
