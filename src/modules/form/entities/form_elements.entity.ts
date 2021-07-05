import { Exclude } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { inputTypes } from '../enum';
import { Forms } from './forms.entity';
import { FormData } from './form_data.entity';

@Entity({ name: 'form_elements' })
export class FormElements extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'form_id' })
  formId: number;

  @Column({ nullable: false })
  label: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'enum', enum: inputTypes })
  type: string;

  @Column({ name: 'is_required' })
  isRequired: boolean;

  @Column({ name: 'place_holder' })
  placeHolder: string;

  @Column({ name: 'validation_message', default: 'Field is required' })
  validationMsg: string;

  @Exclude()
  @Column({ type: 'longtext', name: 'option_values' })
  optionValues: string;

  @Column({ name: 'other_properties', type: 'longtext' })
  otherProperties: any;

  @Column({ name: 'page_no' })
  pageNo: number;

  @Column({ name: 'sort_no' })
  sortNo: number;

  options: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(type => Forms, forms => forms.elements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'form_id', referencedColumnName: 'id' })
  forms: Forms;

  @OneToMany(type => FormData, data => data.elements)
  data: FormData;

  @AfterLoad()
  handleAfterLoad() {
    this.options = this.optionValues.split(',');
    this.otherProperties = JSON.parse(this.otherProperties);
  }

  @BeforeInsert()
  handleBeforeInsert() {
    this.otherProperties = JSON.stringify(this.otherProperties);
  }
}
