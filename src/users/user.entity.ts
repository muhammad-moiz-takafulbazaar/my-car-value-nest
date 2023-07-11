import { AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted User with id ${this.id}`)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated User with id ${this.id}`)
    }
}