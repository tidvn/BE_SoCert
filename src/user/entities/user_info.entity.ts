import { AbstractEntity } from '../../common/common.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_info' })
export class UserInfo extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ name: 'image', nullable: true })
  image: string;

  @ApiProperty()
  @Column({ name: 'email', nullable: true })
  email: string;

  @ApiProperty()
  @Column({ name: 'phone', nullable: true })
  phone: string;

  @ApiProperty()
  @Column({ name: 'wallet_address', unique: true })
  walletAddress: string;

  @ApiProperty()
  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @ApiProperty()
  @Column({ name: 'nonce', default: () => 'gen_random_uuid()' })
  nonce: string;

  @ApiProperty()
  @Column({ name: 'enable', default: false })
  enable: boolean;
}
