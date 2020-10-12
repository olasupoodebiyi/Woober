import { Field, InputType } from "type-graphql";
import { BaseEntity } from "typeorm";

@InputType()
export class StartPhoneVerificationInputArgs extends BaseEntity{
    @Field(()=> String, {nullable: true})
    phoneNumber: string
}