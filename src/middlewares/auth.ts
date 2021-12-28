import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv"
import response from "../utils/httpResponses";
dotenv.config();

export const authuenticate = (req, res, next) => {
    try {
        const {user_id, exp} = jwt.verify(req.headers.authorization, process.env["JWT_ENCRYPTION"]);
        req.headers.user_id = user_id;
        next();
    } catch (e) {
        response(res, "UNAUTHORIZED");
    }
}