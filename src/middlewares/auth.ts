import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv"
import response from "../utils/httpResponses";
import { getUserById } from "../utils/querys";
dotenv.config();

export const authuenticate = async (req, res, next) => {
    try {
        const {user_id, exp} = jwt.verify(req.headers.authorization, process.env["JWT_ENCRYPTION"]);
        req.user = await getUserById(user_id);
        if (req.user === null) { throw "User Not Exist"; }
        next();
    } catch (e) {
        response(res, "UNAUTHORIZED");
    }
}