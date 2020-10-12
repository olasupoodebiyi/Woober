import { Field, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Verification {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({type: "text"})
    target: string

    @Field(() => String)
    @Column({type: "text"})
    payload: string
    
    @Field(() => String)
    @Column({type: "text"})
    key: string

    @Field(() => Boolean)
    @Column({type: "boolean", default: false})
    used: boolean
    
    @Field()
    @CreateDateColumn()
    createdAt: string;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: string;
}