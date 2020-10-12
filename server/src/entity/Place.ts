import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Place extends BaseEntity{
    
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number
    
    @Field(() => String)
    @Column({type: "text"})
    name: string

    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    lat: number

    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    lng: number
    
    @Field(() => String)
    @Column({type: "text"})
    address: string

    @Field(() => Boolean)
    @Column({type: "boolean", default: false})
    isFave: boolean

    @Field()
    @CreateDateColumn()
    createdAt: string;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: string;
}