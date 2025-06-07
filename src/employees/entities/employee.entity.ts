import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Request } from "src/requests/entities/request.entity";
import { BookingGuest } from "../../bookings/entities/booking-guest.entity";
import { JobPosition } from "../../job-positions/entities/job-position.entity";

@Entity('Employee')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;

    @Column('char')
    lastName: string;

    @Column('char')
    firstName: string;

    @Column('char')
    middleName: string;

    @Column('date')
    birthdate: Date;

    @Column('date')
    dateOfEmployment: Date;

    @Column('char')
    phoneNumber: string;

    @Column('char')
    email: string;

    @Column('char')
    passportNumber: string;

    @Column('char')
    passportSeries: string;

    @Column('varchar')
    jobPositionId: string;

    @Column('varchar')
    password: string;

    @ManyToOne(() => JobPosition)
    @JoinColumn({ name: 'jobPositionId' })
    jobPosition: JobPosition;
}
