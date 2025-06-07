import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

@Entity('JobPosition')
export class JobPosition {
  @PrimaryColumn({ name: 'jobPositionId', type: 'varchar' })
  jobPositionId: string;

  @Column({ name: 'jobTitle', type: 'varchar' })
  jobTitle: string;

  @Column({ name: 'jobSalary', type: 'varchar' })
  jobSalary: string;

  @Column({ name: 'departmentId', type: 'varchar' })
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.jobPositions)
  @JoinColumn({ name: 'departmentId' })
  department: Department;
}
