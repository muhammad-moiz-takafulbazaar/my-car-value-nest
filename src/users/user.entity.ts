import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    email: string;

    @Column()
    password: string;
}