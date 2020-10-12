import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class StartPhoneVerificationResponse {
    @Field(() => Boolean)
    ok: boolean

    @Field(() => String, {nullable: true})
    error: string | null

}

