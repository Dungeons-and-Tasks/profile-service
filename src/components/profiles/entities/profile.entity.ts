import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
