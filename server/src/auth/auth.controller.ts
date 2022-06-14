import { Controller, Post, UseGuards, Request, Get, UseInterceptors, UploadedFiles, Body } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UserService } from "src/users/user.service";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('/api/auth')
export class AuthController {
    constructor (
        private authService: AuthService,
        // private userService: UserService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get('/profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }

    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
        { name: 'back', maxCount: 1 }
      ]))
    register(@UploadedFiles() files, @Body() dto: RegisterUserDto) {
        const {avatar, back} = files
        return this.authService.register(dto, avatar[0], back[0]);
    }
}