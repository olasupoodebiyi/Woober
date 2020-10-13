import { decodeJWT } from "../utils/decodeJWT";
import { Request, Response } from 'express';

export const jwt = async (req: Request, _res: Response, next: any): Promise<void> => {
    const token = req.get('X-JWT');
    if(token){
        const user = await decodeJWT(token);
        console.log(user)
    }
    next()
}
