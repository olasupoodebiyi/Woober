import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from './User';
import { Chat } from './Chat';

@Entity()
@ObjectType()
export class Message extends BaseEntity{
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(_type => Chat, chat => chat.messages)
    chat: Chat

    @ManyToOne(_type => User, user => user.messages)
    user: User
    
    @Field(() => String)
    @Column({type: "text"})
    text: string
   
    @Field()
    @CreateDateColumn()
    createdAt: string;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: string;

}