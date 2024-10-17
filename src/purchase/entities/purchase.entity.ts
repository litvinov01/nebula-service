import { Offer } from '../../offer/entities/offer.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @ManyToOne(() => Offer, (offer) => offer.purchases)
  offer: Offer;
}
