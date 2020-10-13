import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config();

import {createConnection} from "typeorm";
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from './resolvers/User/UserResolver';
import cors from "cors";
import logger from 'morgan'
import helmet from 'helmet'
import { jwt } from './middleware/jwt';

const PORT: number | string = process.env.PORT || 4040;



(async ()=> {
    const app = express();

    app.use(cors())
    app.use(logger("dev"))
    app.use(helmet());
    app.use(jwt)

    app.get('/', (_,res) => 
        res.send('Hello!'));

    await createConnection();


    const apolloServer = new ApolloServer({
    schema: await buildSchema({
        resolvers: [UserResolver]
    })
})

    apolloServer.applyMiddleware({app})

    app.listen(PORT, ()=> {
        console.log('Express started on PORT: ' + PORT)
    })

})()


// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
