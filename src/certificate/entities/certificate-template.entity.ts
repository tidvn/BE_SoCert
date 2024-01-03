import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'certificate_template' })
export class CertificateTemplate extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'name' })
  name: string;

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

  @ApiProperty()
  @Column({ name: 'demo', nullable: true, type: 'jsonb' })
  demo: Record<string, any>;
}

interface AtributtesCanvas {
  name: string;
  display: string;
  font: string;
  x: number;
  y: number;
}
