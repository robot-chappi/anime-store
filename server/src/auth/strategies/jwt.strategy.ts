import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/users/constants/constants';
import { UserService } from 'src/users/user.service';
import {ObjectId} from "mongoose"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: {sub: ObjectId, email: string}) {
    const user = await this.userService.getOne(payload.sub);
    if(!user) {
        throw new UnauthorizedException("You don't have access!"); 
    }
    const {password, ...userData} = user['_doc']
    // return { id: payload.sub, email: payload.email };
    return userData;
  }
}