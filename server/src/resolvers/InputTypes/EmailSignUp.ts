import { Field, InputType, Int } from "type-graphql"

@InputType()
export class EmailSignUpInputArgs{
    @Field(()=> String)
    firstName: string

    @Field(()=> String)
    lastName: string

    @Field(()=> String)
    profilePhoto: string

    @Field(()=> String)
    email: string

    @Field(()=> String)
    phoneNumber: string

    @Field(() => Int)
    age: number

}
