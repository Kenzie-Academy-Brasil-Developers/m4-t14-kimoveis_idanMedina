import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Address from "./addresses.entity";
import Category from "./categories.entity";
import Schedule from "./schedule.entity";

@Entity("real_estate")
export class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column({ type: "integer" })
  size: number;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (category) => category.realEstate)
  category: Category;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedule: Schedule[];

  @Column({ default: false })
  sold: boolean;

  @CreateDateColumn()
  createdAt: string | Date;

  @UpdateDateColumn()
  updatedAt: string | Date;
}

export default RealEstate;
