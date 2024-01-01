import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStateDTO {

  @ApiProperty()
  @IsNotEmpty()
  orgId: number;
}