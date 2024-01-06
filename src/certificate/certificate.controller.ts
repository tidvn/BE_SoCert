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
import { CreateCertificateCollectionDTO } from './dto/createCertificateCollection';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) { }

  @Get('/init')
  initData() {
    return this.certificateService.init();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/collection/:certificateId')
  updateCertificateAddress(
    @Param('certificateId') certificateId: string,
    @Body() body: { nftAddress: string },
  ) {
    return this.certificateService.updateCertificateAddress(
      certificateId,
      body.nftAddress,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/id/:certificateId')
  getCertificateById(
    @Req() request: Request,
    @Param('certificateId') certificateId: string,
  ) {
    return this.certificateService.getCertificateById(request, certificateId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:certificateAddress')
  getCertificateByAddress(
    @Req() request: Request,
    @Param('certificateAddress') certificateAddress: string,
  ) {
    return this.certificateService.getCertificateByAddress(request, certificateAddress);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/:certificateAddress/student')
  createCertificateMember(
    @Req() request: Request,
    @Param('certificateAddress') certificateAddress: string,
    @Body() members: any,
  ) {
    return this.certificateService.createCertificateMember(request, certificateAddress, members);
  }


  @ApiBearerAuth()
  @Get('/:certificateAddress/student')
  getCertificateMember(
    @Param('certificateAddress') certificateAddress: string,
  ) {
    return this.certificateService.getCertificateMember(certificateAddress);
  }
}
