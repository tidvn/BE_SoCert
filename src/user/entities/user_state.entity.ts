import { AbstractEntity } from '../../common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_state' })
export class UserState extends AbstractEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ name: 'user_id', unique: true })
  userId: number;

  @ApiProperty()
  @Column({ name: 'current_org' })
  orgId: number;
}