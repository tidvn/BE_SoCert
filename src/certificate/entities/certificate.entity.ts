import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'certificate' })
export class Certificate extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'template ', nullable: true, type: 'jsonb' })
  template: Record<string, any>;

  @ApiProperty()
  @Column({ name: 'organization_id ' })
  organizationId: string;

  @ApiProperty()
  @Column({ name: 'address', nullable: true })
  address: string;

  @ApiProperty()
  @Column({ name: 'metadata', nullable: true, type: 'jsonb' })
  metadata: Record<string, any>;

  @ApiProperty()
  @Column({ name: 'author ', nullable: true, type: 'jsonb' })
  author: Record<string, any>;
}
