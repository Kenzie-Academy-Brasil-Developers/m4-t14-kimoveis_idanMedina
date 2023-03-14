import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./realEstate.entity";
import User from "./user.entity";

@Entity("schedules_users_properties")
export class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string | Date;

  @Column({ type: "date" })
  hour: string | Date;

  @ManyToOne(() => RealEstate, (estate) => estate.schedule)
  realEstate: RealEstate;

  @ManyToOne(() => User, (user) => user.schedule)
  user: User;
}

export default Schedule;
