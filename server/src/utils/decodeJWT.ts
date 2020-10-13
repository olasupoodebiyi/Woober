import jwt from 'jsonwebtoken'
import { User } from "../entity/User";

export const decodeJWT = async(token: string): Promise<User | undefined> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
        const { id } = decoded;
        const user = await User.findOne({id});
        return user;        
    } catch (error) {
        return undefined;
    }
}