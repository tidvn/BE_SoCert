import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'certificate_template' })
export class CertificateTemplate extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ name: 'background', nullable: true })
  background: string;

  @ApiProperty()
  @Column({ name: 'height', nullable: true })
  height: number;

  @ApiProperty()
  @Column({ name: 'width', nullable: true })
  width: number;

  @ApiProperty()
  @Column({ name: 'atributtes', nullable: true, type: 'jsonb' })
  atributtes: AtributtesCanvas[];
}

interface AtributtesCanvas {
  name: string;
  display: string;
  font: string;
  x: number;
  y: number;
}
