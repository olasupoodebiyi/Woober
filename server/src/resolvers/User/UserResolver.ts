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
import { CompletePhoneVerificationResponse } from './../ResponseTypes/CompletePhoneVerification';
import { CompletePhoneVerificationInputArgs } from "../InputTypes/CompletePhoneVerification";
import { EmailSignUpResponse } from './../ResponseTypes/EmailSignUpResponse';
import { createJWT } from './../../utils/createJWT';


@Resolver()
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => EmailSignUpResponse)
    async emailSignUp(
        @Arg('options') options: EmailSignInInputArgs
    ): Promise<EmailSignUpResponse> {
        const {email} = options;
        try {
            const existingUser = await User.findOne({ email })
            if (existingUser){
                return {
                    ok: false,
                    error: "You should log in instead",
                    token: null
                }
            } else {
                
                const newUser = await User.create({...options}).save()
                const token = createJWT(newUser.id)

                return {
                    ok: true,
                    error: null,
                    token
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
                const token = createJWT(user.id)

                return {
                    ok: true,
                    error: null,
                    token
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

    @Mutation(() => CompletePhoneVerificationResponse)
    async completePhoneVerification(
        @Arg("options") options: CompletePhoneVerificationInputArgs
    ): Promise<CompletePhoneVerificationResponse> {
        const {phoneNumber, key } = options;

        try {
            const verification = await Verification.findOne({
                payload: phoneNumber,
                key
            });
            if(!verification){
                return {
                    ok: false,
                    error: "Verification key is not valid",
                    token: null
                }
            } else {
                verification.verified = true;
                verification.save();
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message,
                token: null
            }
        }
        try {
            const user = await User.findOne({phoneNumber})
            if (user){
                user.verifiedPhoneNumber = true
                user.save();
                const token = createJWT(user.id)

                return {
                    ok: true,
                    error: null,
                    token
                }
            } else {
                return {
                    ok: true,
                    error: null,
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


    @Mutation(() => FacebookConnectResponse)
    async facebookConnect(
        @Arg("options") options: FacebookConnectInputArgs
    ): Promise<FacebookConnectResponse> {
        const {fbID } = options
        try {
            const existingUser = await User.findOne({fbID})
            if (existingUser){
                const token = createJWT(existingUser.id)
                return {
                    ok: true,
                    error: null,
                    token
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
            const newUser = await User.create({...options, profilePhoto: `http://graph.facebook/${fbID}/picture?type=square`}).save()
                
            const token = createJWT(newUser.id)
            return {
                    ok: true,
                    error: null,
                    token
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