import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { UserEntity } from '../entitys/User';
import response from '../utils/httpResponses';
import { getUser } from '../utils/querys';

class Auth {
    
    static signin = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!(email && password)) { response(res, "UNAUTHORIZED"); }

        try {
            const token = await getManager().createQueryBuilder(UserEntity, 'user')
                .addSelect('user.password')
                .addSelect('user.token')
                .where('user.email = :email', {email: email})
                .getOneOrFail();
            
            if (!await token.comparePassword(password)) { throw 'Invalid Password'; }

            const user = await getUser(token.token);
            if (user === null) { throw 'Invalid Token'; }

            response(res, "OK", {user});
            
        } catch (e) {
            response(res, "UNAUTHORIZED");
        }
    }

    static signup = async (req: Request, res: Response) => {
        try {
            let { email, nickname, password } = req.body;
            console.log(req.body);
            
            if (!(email && nickname && password)) { throw 'Invalid Data' }

            const user = new UserEntity();
            user.email = email.trim();
            user.nickname = nickname.trim();
            await user.setPasswrord(password);
            
            user.save().then(() => {
                user.generateJWT();
                
                user.save().then(() => {
                    response(res, "CREATED", {user});
                }).catch(() => {
                    response(res, "BAD_REQUEST", {user});
                })
            }).catch((e) => {
                response(res, "BAD_REQUEST");
            });
            
            
        } catch (e) {
            console.log(e);
            response(res, "BAD_REQUEST");
        }
    }
}

export default Auth;