import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organization_member' })
export class OrganizationMember extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({ name: 'organization_id' })
  organizationId: number;
}
