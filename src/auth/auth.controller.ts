import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Network } from 'src/common/common.enum';
import { WalletSignatureDTO } from './dto/wallet-signature.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('/wallet/:walletAddress/nonce')
  getNonce(@Param('walletAddress') walletAddress: string): any {
    return this.authService.getNonce(walletAddress);
  }

  @Post('/:network/login')
  login(
    @Param('network') network: Network,
    @Body() walletSignature: WalletSignatureDTO,
  ): any {
    return this.authService.login(network, walletSignature);
  }
}
