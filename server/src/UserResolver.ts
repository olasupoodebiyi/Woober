import {  Query, Resolver } from "type-graphql";
import { User } from './entity/User';

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find()
    }

    // @Mutation()
    // async register(
    //     @Arg('email', () => String) email: string,
    //     @Arg('password', () => String) password: string,
    // ) {
    //     await User.insert({
    //         email
    //     })
    // }
    
}