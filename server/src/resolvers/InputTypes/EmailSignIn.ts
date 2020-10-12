import { Field, InputType } from "type-graphql"

@InputType()
export class EmailSignInInputArgs{
    @Field(()=> String, {nullable: true})
    email: string

    @Field(()=> String)
    password: string
}
