import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Request } from "src/requests/entities/request.entity";

@Entity('Guest')
export class Guest {
    @PrimaryColumn('char')
    guestId: string;

    @Column('char', { nullable: true })
    lastName: string;

    @Column('char', { nullable: true })
    firstName: string;

    @Column('char', { nullable: true })
    middleName: string;

    @Column('char', { nullable: true })
    gender: string;

    @Column('char', { nullable: true })
    birthdate: string;

    @Column('char', { nullable: true })
    birthplace: string;

    @Column('char', { nullable: true })
    phoneNumber: string;

    @Column('char', { nullable: true })
    email: string;

    @Column('char', { nullable: true })
    citizenship: string;

    @Column('char', { nullable: true })
    passportNumber: string;

    @Column('char', { nullable: true })
    passportSeries: string;

    @OneToMany(() => Request, request => request.guest)
    requests: Request[];
}
