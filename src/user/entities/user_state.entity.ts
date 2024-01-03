import { AbstractEntity } from '../../common/common.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_state' })
export class UserState extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'user_id', unique: true })
  userId: string;

  @ApiProperty()
  @Column({ name: 'current_org' })
  organizationId: string;
}
