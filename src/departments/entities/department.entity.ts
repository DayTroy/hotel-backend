import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { JobPosition } from '../../job-positions/entities/job-position.entity';

@Entity('Department')
export class Department {
  @PrimaryColumn({ name: 'departmentId', type: 'varchar' })
  departmentId: string;

  @Column({ name: 'departmentTitle', type: 'varchar' })
  departmentTitle: string;

  @Column({ name: 'departmentCabinet', type: 'varchar' })
  departmentCabinet: string;

  @Column({ name: 'workingHours', type: 'varchar' })
  workingHours: string;

  @OneToMany(() => JobPosition, (jobPosition) => jobPosition.department)
  jobPositions: JobPosition[];
}
