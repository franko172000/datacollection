import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { FormData } from './form_data.entity';
import { FormElements } from './form_elements.entity';

@Entity({ name: 'forms' })
export class Forms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ name: 'page_count', default: 1 })
  pageCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(type => FormElements, elements => elements.forms, {
    eager: true,
  })
  elements: FormElements;

  @OneToMany(type => FormData, data => data.formData, {
    eager: false,
  })
  data: FormData;

  @ManyToOne(type => Users, user => user.forms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}
