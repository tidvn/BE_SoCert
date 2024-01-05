import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCertificateCollectionDTO {
  @ApiProperty()
  @IsNotEmpty()
  metadata: MetadataDto;

  @ApiProperty()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty()
  @IsNotEmpty()
  organizationId: string;
}

interface AttributeDto {
  trait_type: string;
  value: string;
}
interface AttributeDto {
  trait_type: string;
  value: string;
}

interface MetadataDto {
  name: string;
  description: string;
  image: string;
  attributes: AttributeDto[];
  creators: string[];
  certificate: 'socert';
}
