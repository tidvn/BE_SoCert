import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WalletSignatureDTO {
  @ApiProperty()
  @IsNotEmpty()
  publicAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  signature: string;
}
