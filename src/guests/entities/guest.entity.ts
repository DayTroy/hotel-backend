import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Request } from "src/requests/entities/request.entity";

@Entity()
export class Guest {
    @PrimaryGeneratedColumn()
    guestId: number;

    @OneToMany(() => Request, request => request.guest)
    requests: Request[];
}
