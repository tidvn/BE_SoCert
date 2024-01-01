import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "src/common/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'organization' })
export class Organization extends AbstractEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id: number;

    @ApiProperty()
    @Column({ name: 'name', default: "" })
    name: string;

    @ApiProperty()
    @Column({ name: 'image', default: "" })
    image: string;

    @ApiProperty()
    @Column({ name: 'email', default: "" })
    email: string;

    @ApiProperty()
    @Column({ name: 'phone', default: "" })
    phone: string;

    @ApiProperty()
    @Column({ name: 'website', default: "" })
    website: string;

    @ApiProperty()
    @Column({ name: 'location', default: "" })
    location: string;

}
