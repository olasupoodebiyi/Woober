import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import {IsEmail} from 'class-validator';
import bcrypt from "bcrypt"

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
    
    @Field(() => Int)
    @Column({type: 'int'})
    age: number;

    @Field(() => String)
    @Column({type: "text"})
    phoneNumber: string

    @Field(() => String)
    @Column()
    password: string;
    
    @Field()
    @CreateDateColumn()
    createdAt: string;
    
    @Field()
    @UpdateDateColumn()
    updatedAt: string;
    
    @Field(() => Boolean)
    @Column()
    verifiedPhoneNumber: boolean;

    
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
