import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('Cleaning')
export class Cleaning {
  @PrimaryColumn('varchar', { length: 20 })
  cleaningId: string;

  @Column('date')
  scheduledDate: Date;

  @Column('varchar', { length: 30 })
  status: string;

  @Column('varchar', { length: 100, nullable: true })
  description: string;

  @Column('varchar', { length: 30 })
  cleaningType: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column('varchar', { length: 20 })
  roomId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column('uuid')
  employeeId: string;
}
