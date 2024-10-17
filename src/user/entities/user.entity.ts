import { Purchase } from '../../purchase/entities/purchase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32, unique: true })
  email: string;

  @Column({ type: 'json' })
  marketingData: Record<string, any>;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
