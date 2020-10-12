import { Field, InputType } from "type-graphql";
import { BaseEntity } from "typeorm";

@InputType()
export class CompletePhoneVerificationInputArgs extends BaseEntity{
    @Field(()=> String, {nullable: true})
    phoneNumber: string

    @Field(() => String)
    key: string
}