import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Forms } from '../../form/entities/forms.entity';
import { accountStatus } from '../enum';
import { UsersProfile } from './users_profile.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ name: 'is_activated', nullable: false, default: 0 })
  isActivated: boolean;

  @Column({ name: 'account_status', type: 'enum', enum: accountStatus, default: accountStatus.pd })
  accountStatus: string;

  @Column({ name: 'last_logged_in', nullable: true })
  lastLoggedIn: Date;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @OneToOne(type => UsersProfile, profile => profile.user, {
    eager: true,
    cascade: false,
  })
  profile: UsersProfile;

  @OneToMany(type => Forms, forms => forms.user)
  forms: Forms;
}
