import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { UserEntity } from '../entitys/User';
import response from '../utils/httpResponses';
import { getUserByToken, userExists } from '../utils/querys';
const {OAuth2Client} = require('google-auth-library');
import * as dotenv from "dotenv"
dotenv.config();

class Auth {
    
    static #signin = async (req: Request, res: Response, email: string, password?: string) => {
        try {
            const token = await getManager().createQueryBuilder(UserEntity, 'user')
                .addSelect('user.password')
                .addSelect('user.token')
                .where('user.email = :email', {email: email})
                .getOneOrFail();
            
            if (password && !await token.comparePassword(password)) { throw 'Invalid Password'; }

            const user = await getUserByToken(token.token);
            if (user === null) { throw 'Invalid Token'; }

            response(res, "OK", {user});
        } catch (e) {
            response(res, "UNAUTHORIZED");
        }
    }

    static #signup = async (req: Request, res: Response, email: string, nickname: string, password: string | null, avatar?: string) => {
        try {
            const user = new UserEntity();
            user.email = email.trim();
            user.nickname = nickname.trim();
            user.avatar = avatar;
            if (password) {await user.setPasswrord(password);}
            
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
            response(res, "BAD_REQUEST");
        }
    }

    static signin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!(email && password)) { response(res, "UNAUTHORIZED"); }

            await Auth.#signin(req, res, email, password);
        } catch (e) {
            response(res, "BAD_REQUEST");
        }
        
    }

    static signup = async (req: Request, res: Response) => {
        try {
            let { email, nickname, password } = req.body;
            if (!(email && nickname && password)) { throw 'Invalid Data'; }

            Auth.#signup(req, res, email, nickname, password);
        } catch (e) {
            response(res, "BAD_REQUEST");
        }
    }

    static googleAuth = async (req: Request, res: Response) => {
        try {
            const { token_id } = req.body;
            if (!token_id) { throw 'Invalid Token'; }

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            async function verify() {
                try {
                    const ticket = await client.verifyIdToken({
                        idToken: token_id,
                        audience: process.env.GOOGLE_CLIENT_ID,
                    });
                    const payload = ticket.getPayload();                    
                    
                    if (await userExists(payload.email)) {
                        await Auth.#signin(req, res, payload.email);
                    } else {
                        await Auth.#signup(req, res, payload.email, payload.name, null, payload.picture);
                    }
                } catch (e) {
                    console.log(e);
                    response(res, "BAD_REQUEST");
                }
            }

            verify();

        } catch (e) {
            console.log(e);
            response(res, "BAD_REQUEST");
        }
    }
}

export default Auth;