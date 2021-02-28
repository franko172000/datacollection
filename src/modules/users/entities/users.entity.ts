import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne} from 'typeorm';
import { accountStatus } from '../enum';
import { UsersProfile } from './users_profile.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({name: 'is_activated', nullable: true})
    isActivated: boolean

    @Column({name:'account_status', type: 'enum', enum:accountStatus, default:accountStatus.pd})
    accountStatus: string

    @Column({name:'last_logged_in', nullable: true})
    lastLoggedIn: Date

    @CreateDateColumn({name:'created_at'})
    createdAt: Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date

    @OneToOne(type=>UsersProfile, profile=>profile.user,{
        eager: false,
        cascade: false
    })
    profile: UsersProfile
}