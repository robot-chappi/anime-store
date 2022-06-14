import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/users/schemas/user.schema";
import {Model, ObjectId} from "mongoose"
import { UserService } from "src/users/user.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/register-user.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        const isMatch = await bcrypt.compare(password, user.password)
        if (user && isMatch) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    generateJwtToken(data: {_id: string; email: string}) {
        const payload = { email: data['email'], sub: data['_id'] };
        return this.jwtService.sign(payload);
    }

    async login(user: any) {
        const {password, ...userData} = user;
        const payload = { email: user['_doc']['email'], sub: user['_doc']['_id'] };
        return {
            ...userData['_doc'],
            token: this.generateJwtToken(userData['_doc']),
        };
    }

    async register(dto: RegisterUserDto, avatar, back) {
        try {
            const {password, ...user} = await this.userService.register(dto, avatar, back)
            return {
                ...user['_doc'],
                token: this.generateJwtToken(user['_doc']),
            };
        }
        catch (e) {
            throw new ForbiddenException(e)
        }
    }
}