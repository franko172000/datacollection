import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Forms } from './forms.entity';
import { FormElements } from './form_elements.entity';

@Entity({ name: 'form_data' })
export class FormData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'element_id' })
  elementId: number;

  @Column({ nullable: false, name: 'form_id' })
  formId: number;

  @Column({ nullable: false, name: 'agent_id', type: 'uuid' })
  agentId: string;

  @Column({ nullable: false, name: 'input_value', type: 'text' })
  inputValue: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(type => FormElements, elements => elements.data, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'element_id', referencedColumnName: 'id' })
  elements: FormElements;

  @ManyToOne(type => Forms, formData => formData.elements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'form_id', referencedColumnName: 'id' })
  formData: Forms;
}
