import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'organization' })
export class Organization extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'name', nullable: true })
  name: string;

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
  @Column({ name: 'website', nullable: true })
  website: string;

  @ApiProperty()
  @Column({ name: 'location', nullable: true })
  location: string;
}
