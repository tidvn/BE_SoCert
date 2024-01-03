import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student_certificate' })
export class StudentCertificate extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ name: 'certificate_id' })
  certificateId: number;

  @ApiProperty()
  @Column({ name: 'address', unique: true })
  address: string;

  @ApiProperty()
  @Column({ name: 'name', nullable: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'metadata', nullable: true })
  metadata: string;
}
