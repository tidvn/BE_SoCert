import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'certificate' })
export class Certificate extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ name: 'template ', nullable: true })
  template: number;

  @ApiProperty()
  @Column({ name: 'organization_id ' })
  organizationId: number;

  @ApiProperty()
  @Column({ name: 'address', unique: true })
  address: string;

  @ApiProperty()
  @Column({ name: 'name', nullable: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'image', nullable: true })
  image: string;

  @ApiProperty()
  @Column({ name: 'metadata', nullable: true, type: 'jsonb' })
  metadata: JSON;

  @ApiProperty()
  @Column({ name: 'author ', nullable: true, type: 'jsonb' })
  author: JSON;
}
