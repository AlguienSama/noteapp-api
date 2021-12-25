import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { UserEntity } from '../entitys/User';
import response from '../utils/httpResponses';
import { getUser } from '../utils/querys';

class Auth {
    
    static signin = async (req: Request, res: Response) => {
        const { email, password } = req.body.data;

        if (!(email && password)) { response(res, "UNAUTHORIZED"); }

        try {
            const token = await getManager().createQueryBuilder(UserEntity, 'user')
                .select(['password', 'token'])
                .where('user.email = :email', {email})
                .getOneOrFail();
            
            if (!await token.comparePassword(password)) { throw 'Invalid Password'; }

            const user = await getUser(token.token);
            if (user === null) { throw 'Invalid Token'; }

            response(res, "OK", user);
            
        } catch (e) {
            response(res, "UNAUTHORIZED");
        }
    }

    static signup = async (req: Request, res: Response) => {
        
    }
}

export default Auth;