import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {  FacebookConnectResponse } from '../ResponseTypes/FacebookConnectResponse';
import { FacebookConnectInputArgs } from '../InputTypes/FacebookConnect';
import { User } from '../../entity/User';
import { EmailSignInInputArgs } from './../InputTypes/EmailSignIn';
import { EmailSignInResponse } from './../ResponseTypes/EmailSignInResponse';
import { StartPhoneVerificationResponse } from './../ResponseTypes/StartPhoneVerificationResponse';
import { StartPhoneVerificationInputArgs } from '../InputTypes/StartPhoneVerification';
import { Verification } from '../../entity/Verification';
import { sendVerificationSMS } from "../../utils/sendSMS";


@Resolver()
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => EmailSignInResponse)
    async emailSignIn(
        @Arg('options') options: EmailSignInInputArgs
    ): Promise<EmailSignInResponse> {
        const { email, password } = options;
        try {
            const user = await User.findOne({ email})
            if (!user){
                return {
                ok: false,
                error: "No user with that email!",
                token: null
        }
            }

            const checkPassword = await user.comparePassword(password);
            if (checkPassword){
                return {
                    ok: true,
                    error: null,
                    token: "Coming Soon, after!"
                }
            } else {
                return {
                    ok: false,
                    error: "Wrong password",
                    token: null
                }
            }

        } catch (error) {
            return {
                ok: false,
                error: error.message,
                token: null
            }
        }
    }

    @Mutation(() => StartPhoneVerificationResponse)
    async startPhoneVerification(
        @Arg('options') options: StartPhoneVerificationInputArgs 
    ): Promise<StartPhoneVerificationResponse> {
        const {phoneNumber } = options;
        
        try {
            const existingVerification = await Verification.findOne({payload: phoneNumber})
            if (existingVerification){
                existingVerification.remove()
            }
            const newVerification = await Verification.create({
                payload: phoneNumber,
                target: "PHONE"                
            }).save();
            //TO DO send SMS
            await sendVerificationSMS(newVerification.payload, newVerification.key)
            return {
                ok: true,
                error: null
            }
            
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }


    @Mutation(() => FacebookConnectResponse)
    async facebookConnect(
        @Arg("options") options: FacebookConnectInputArgs
    ): Promise<FacebookConnectResponse> {
        const {fbID } = options
        try {
            const existingUser = await User.findOne({fbID})
            if (existingUser){
                return {
                    ok: true,
                    token: "Coming soon, already",
                    error: null,
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: `First error: ${error.message}`,
                token: null
            }
        }
        try {
            await User.create({...options, profilePhoto: `http://graph.facebook/${fbID}/picture?type=square`}).save()
                return {
                    ok: true,
                    error: null,
                    token: "Coming soon, created!"
                }
        
        } catch (error) {
            return {
                ok: false,
                error: error.message,
                token: null
            }
        }
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