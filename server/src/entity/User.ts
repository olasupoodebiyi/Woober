import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany} from "typeorm";
import {IsEmail} from 'class-validator';
import bcrypt from "bcrypt"
import { Chat } from './Chat';
import { Message } from './Message';
import { Ride } from './Ride';

const BCRYPT_ROUNDS = 10;

@Entity('users')
@ObjectType()
export class User extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({type: 'text'})
    firstName: string;
    
    @Field(() => String)
    @Column({type: 'text'})
    lastName: string;
    
    @Field(() => String)
    @Column({type: 'text', unique: true})
    @IsEmail()
    email: string;
    
    @Field(() => Boolean)
    @Column({type: "boolean", default: false})
    verifiedEmail: boolean;
    
    @Field(() => String)
    @Column()
    profilePhoto: string;
    
    @Field(() => Int, {nullable: true})
    @Column({type: 'int', nullable: true})
    age: number;

    @Field(() => String, {nullable: true})
    @Column({type: "text", nullable: true})
    phoneNumber: string

    @Field(() => String)
    @Column({nullable: true})
    password: string;
    
    @Field(()=> String)
    @Column({nullable: true})
    fbID: string;
    
    @Field()
    @CreateDateColumn()
    createdAt: string;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: string;
    
    @Field(() => Boolean, {nullable: true})
    @Column({nullable: true})
    verifiedPhoneNumber: boolean;

    @ManyToOne(_type => Chat, chat => chat.participants)
    chat: Chat

    @OneToMany(_type => Message, message => message.user)
    messages: Message[]

    @OneToMany(_type => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[]
    
    @OneToMany(_type => Ride, ride => ride.driver)
    ridesAsDriver: Ride[]
    
    @Field(() => Boolean)
    @Column({type: "boolean", default: false})
    isDriving: boolean;
    
    @Field(() => Boolean)
    @Column({type: "boolean", default: false})
    isRiding: boolean
    
    @Field(() => Boolean)
    @Column({type: "boolean", default: false})
    isTaken: boolean
    
    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    lastLng: number
    
    @Field(() => Int)
    @Column({type: "double precision", default: 0})
    lastLat: number
    
    @Field(() => Int, {nullable: true})
    @Column({type: "double precision", default: 0})
    lastOrientation?: number;
    
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    public comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if (this.password) {
            const hashedPassword = await this.hashPassword(this.password)
            this.password = hashedPassword
        }
    }
    
        private hashPassword(password: string): Promise<string> {
            return bcrypt.hash(password, BCRYPT_ROUNDS)
        }
}
