import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUser } from "src/types/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
            private readonly configSerice: ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configSerice.get('JWT_SECRET')
        })
    }

    async validate(user: IUser) {
        return {
            id: user.id,
            email: user.email
        }
    }
}