import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import RealEstate from "./realEstate.entity";
  
  @Entity("categories")
  export class Category {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ length: 60 })
    name: string;

    @OneToMany(() => RealEstate, (estate) => estate.category)
    realEstate: RealEstate[];
  }
  
  export default Category;
  