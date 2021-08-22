import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../../users/entities/users.entity';
import { FormData } from '../../form/entities/form_data.entity';

@Entity({ name: 'agents' })
export class AgentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: false, type: 'uuid' })
  userId: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ name: 'is_activated', nullable: false, default: 0 })
  isActivated: boolean;

  @Column({ name: 'last_logged_in', nullable: true })
  lastLoggedIn: Date;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @BeforeInsert()
  handleBeforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeUpdate()
  handleBeforeUpdate() {
    this.password = this.password !== '' ? bcrypt.hashSync(this.password, 10) : this.password;
  }

  @OneToMany(type => FormData, form_data => form_data.agent)
  form_data: FormData;

  @ManyToOne(type => Users, user => user.agents, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}
