import { Purchase } from '../../purchase/entities/purchase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offer')
export class Offer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256, unique: true })
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
