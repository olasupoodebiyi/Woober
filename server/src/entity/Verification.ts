import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { verificationTarget} from '../types/types'
// import { User } from "./User";

const PHONE = "PHONE"
const EMAIL = "EMAIL"

@Entity()
@ObjectType()
export class Verification extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({type: "text", enum: [PHONE, EMAIL]})
    target: verificationTarget

    @Field(() => String)
    @Column({type: "text"})
    payload: string
    
    @Field(() => String)
    @Column({type: "text"})
    key: string
    
    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

    @BeforeInsert()
    createKey(): void{
        if (this.target === PHONE){
            this.key = Math.floor(Math.random() * 100000).toString()
        } else if (this.target === EMAIL){
            this.key = Math.random().toString(36).substr(2)
        }

    }
}