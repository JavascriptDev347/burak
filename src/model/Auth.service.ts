import {Member} from "../lib/types/member";
import {AUTH_TIMER} from "../lib/config";
import jwt from 'jsonwebtoken';
import Errors, {HttpCode, Message} from "../lib/Error";

class AuthService {
    constructor() {
    }

    public async createToken(payload: Member) {
        return new Promise((resolve, reject) => {
            const duration = `${AUTH_TIMER}h`;
            jwt.sign(payload, process.env.SECRET_TOKEN as string, {
                expiresIn: duration
            }, (err, token) => {
                if (err) reject(
                    new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
                ); else resolve(token as string);
            })
        })
    }
}

export default AuthService;