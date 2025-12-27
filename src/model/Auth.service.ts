import {Member} from "../lib/types/member";
import {AUTH_TIMER} from "../lib/config";
import jwt from 'jsonwebtoken';
import Errors, {HttpCode, Message} from "../lib/Error";

class AuthService {
    private readonly secretToken = process.env.SECRET_TOKEN as string;
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

    public async checkAuth(token: string): Promise<Member> {
        return jwt.verify(token, this.secretToken) as Member;
    }
}

export default AuthService;