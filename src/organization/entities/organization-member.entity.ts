import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'organization_member' })
export class OrganizationMember extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty()
  @Column({ name: 'organization_id' })
  organizationId: string;

  @ApiProperty()
  @Column({ name: 'role',nullable: true })
  role: string;

}
