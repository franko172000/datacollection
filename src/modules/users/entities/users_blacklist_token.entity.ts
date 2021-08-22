import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'users_blacklisted_token' })
export class UsersBlacklistToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 350 })
  token: string;

  @Column({ nullable: false, name: 'expire_at' })
  expireAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
