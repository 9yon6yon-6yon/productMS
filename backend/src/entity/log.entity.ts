import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  readonly id?: number;

  @Column()
  user: string;

  @Column()
  method: string;

  @Column()
  route: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  readonly timestamp?: Date;
}
