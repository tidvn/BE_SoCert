import { AbstractEntity } from '../../common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_info' })
export class UserInfo extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ name: 'first_name', default: '' })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', default: '' })
  lastName: string;

  @ApiProperty()
  @Column({ name: 'image', default: '' })
  image: string;

  @ApiProperty()
  @Column({ name: 'email', default: '' })
  email: string;

  @ApiProperty()
  @Column({ name: 'phone', default: '' })
  phone: string;

  @ApiProperty()
  @Column({ name: 'wallet_address', unique: true })
  walletAddress: string;

  @ApiProperty()
  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @ApiProperty()
  @Column({ name: 'enable', default: false })
  enable: boolean;
}
