import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class EmailSignInResponse {
    @Field(() => Boolean)
    ok: boolean

    @Field(() => String, {nullable: true})
    error: string | null

    @Field(() => String, {nullable: true})
    token: string | null
}

