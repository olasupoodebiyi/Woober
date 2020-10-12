import { Field, Int, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { rideStatus } from "types/types";
import { User } from './User';

@Entity()
@ObjectType()
export class Ride extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({type: "text", enum: ["ACCEPTED", 'FINISHED', "CANCELLED", "REQUESTING", "ENROUTE"]})
    status: rideStatus

    @Field(() => String)
    @Column({type: "text"})
    pickupAddress: string

    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    pickupLat: number

    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    pickupLng: number
    
    @Field(() => String)
    @Column({type: "text"})
    dropOffAddress: string
    
    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    dropOffLng: number
    
    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    dropOffLat: number
    
    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    price: number
   
    @Field(() => String)
    @Column({type: "text"})
    distance: string
    
    @Field(() => String)
    @Column({type: "text"})
    duration: string

    @ManyToOne(_type => User, user => user.ridesAsPassenger)
    passenger: User

    @ManyToOne(_type => User, user => user.ridesAsDriver)
    driver: User

    @Field()
    @CreateDateColumn()
    createdAt: string;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: string;

}