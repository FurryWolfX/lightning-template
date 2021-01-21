import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  gender!: string;

  @OneToOne(
    () => User,
    user => user.profile
  ) // 将另一面指定为第二个参数
  user!: User;
}
