import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Profile } from "./Profile";
import { Photo } from "./Photo";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id?: number;

  @Column({ name: "first_name" })
  firstName!: string;

  @Column({ name: "last_name" })
  lastName!: string;

  @Column({ name: "age" })
  age!: number;

  @Column({ name: "sex", default: "" })
  sex!: string;

  @OneToOne(
    () => Profile,
    profile => profile.user
  ) // 将另一面指定为第二个参数
  @JoinColumn({ name: "profile_id" })
  profile!: Profile;

  @OneToMany(
    () => Photo,
    photo => photo.user
  )
  photos!: Photo[];
}
