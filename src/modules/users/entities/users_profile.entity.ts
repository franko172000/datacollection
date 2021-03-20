import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToOne, JoinColumn} from 'typeorm';
import { Users } from './users.entity';

@Entity({name:'users_profile'})
export class UsersProfile {
    @PrimaryColumn()
    user_id: string;

    @Column({name: 'first_name', nullable: false})
    firstName: string;

    @Column({name: 'last_name',nullable: false})
    lastName: string;

    @Column({nullable: true})
    telephone: string

    @Column({name:'company_name',nullable: true})
    companyName: string

    @Column({nullable: true})
    industry: string

    @CreateDateColumn({name:'created_at'})
    createdAt: Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date

    @OneToOne(type=>Users,user=>user.profile,{
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: Users
}