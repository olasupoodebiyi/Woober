import { Field, InputType } from "type-graphql"

@InputType()
export class FacebookConnectInputArgs{
    @Field(()=> String)
    firstName: string

    @Field(()=> String)
    lastName: string

    @Field(()=> String, {nullable: true})
    email: string

    @Field(()=> String)
    fbID: string
}
