import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./Message";
import { User } from './User';

@Entity()
@ObjectType()
export class Chat extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(_type => Message, message => message.chat)
    messages: Message[]

    @OneToMany(_type => User, user => user.chat)
    participants: User[]
      
    @Field()
    @CreateDateColumn()
    createdAt: string;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: string;
}