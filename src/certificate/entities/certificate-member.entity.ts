import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'certificate_member' })
export class CertificateMember extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'collection_address' })
  collectionAddress: string;

  @ApiProperty()
  @Column({ name: 'canvas ', nullable: true, type: 'jsonb' })
  canvas: Record<string, any>;

  @ApiProperty()
  @Column({ name: 'address', nullable: true })
  address: string;

  @ApiProperty()
  @Column({ name: 'name', nullable: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'metadata', nullable: true, type: 'jsonb' })
  metadata: Record<string, any>;
}
