import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  discordId!: string;

  @Column()
  username!: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  globalName!: string | null;

  @Column({ nullable: true, type: "varchar", length: 255 })
  avatar!: string | null;

  @Column({ nullable: true, type: "varchar", length: 255 })
  banner!: string | null;

  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  verified!: boolean;
}
