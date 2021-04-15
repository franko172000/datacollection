import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  user_id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
