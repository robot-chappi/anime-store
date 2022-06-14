import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import {ObjectId} from "mongoose"
import { LoginUserDto } from "./dto/login-user.dto";
// import { Request, Response } from "express";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { ChangeUserPasswordDto } from "./dto/change-password.dto";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { DeleteItemDto } from "./dto/delete-item.dto";
import { ChangeUserDataDto } from "./dto/change-data.dto";
import { ChangeUserPhotoDto } from "./dto/change-photo.dto";
import { RegisterUserDto } from "src/auth/dto/register-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateUserDataDto } from "./dto/update-userData.dto";


@Controller('/api/user')
export class UserController {
    constructor(
        private userService: UserService
        ) {}

    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
        { name: 'back', maxCount: 1 }
      ]))
    create(@UploadedFiles() files, @Body() dto: RegisterUserDto) {
        const {avatar, back} = files
        return this.userService.register(dto, avatar[0], back[0]);
    }

    // @Post('/login')
    // login(@Body() dto: LoginUserDto, 
    //       @Res({passthrough: true}) response: Response) {
    //     return this.userService.login(dto, response)
    // }

    // @Get('/cookie')
    // user(@Req() request: Request) {
    //     return this.userService.user(request)
    // }

    // @Post('/logout')
    // logout(@Res({passthrough: true}) response: Response) {
    //     return this.userService.logout(response)
    // }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/change/data/me')
    updateProfile(@Request() req: any, @Body() dto: UpdateUserDataDto) {
        return this.userService.updateUserData(req, dto)
    }

    
    @Post('/change/password')
    changePassword(@Body() dto: ChangeUserPasswordDto) {
        return this.userService.changePassword(dto)
    }

    // @UseGuards(JwtAuthGuard)
    // @Post('/change/name')
    // changeNameData(@Body() dto: ChangeUserDataDto) {
    //     return this.userService.changeName(dto)
    // }

    // @Post('/change/about')
    // changeAboutData(@Body() dto: ChangeUserDataDto) {
    //     return this.userService.changeAbout(dto)
    // }

    // @Post('/change/social')
    // changeSocialData(@Body() dto: ChangeUserDataDto) {
    //     return this.userService.changeSocial(dto)
    // }

    @UseGuards(JwtAuthGuard)
    @Post('/change/avatar')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
      ]))
    changeAvatarData(@Request() req: any, @UploadedFiles() files, @Body() dto: ChangeUserPhotoDto) {
        const {avatar} = files
        return this.userService.changeAvatarData(req, dto, avatar[0])
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change/back')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'back', maxCount: 1 },
      ]))
    changeBackData(@Request() req: any, @UploadedFiles() files, @Body() dto: ChangeUserPhotoDto) {
        const {back} = files
        return this.userService.changeBackData(req, dto, back[0])
    }

    @UseGuards(JwtAuthGuard)
    @Post('/basket/add')
    addBasketItem(@Request() req: any, @Body() dto: CreateBasketDto) {
        return this.userService.addBasketItem(req, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/basket')
    getBasket(@Request() req: any) {
        return this.userService.getBasket(req);
    }

    @Get('/basket/item/:id')
    getBasketItem(@Param('id') id:ObjectId) {
        return this.userService.getBasketItem(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/favorite')
    getFavorite(@Request() req: any) {
        return this.userService.getFavorite(req);
    }

    @Get('/favorite/item/:id')
    getFavoriteItem(@Param('id') id:ObjectId) {
        return this.userService.getFavoriteItem(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/basket/all')
    deleteBasketAll(@Request() req: any) {
        return this.userService.deleteBasketAll(req)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/basket/:id')
    deleteBasketOne(@Request() req: any, @Param('id') id:string) {
        return this.userService.deleteBasketOne(req, id)
    }


    @UseGuards(JwtAuthGuard)
    @Post('/favorite/add')
    addFavoriteItem(@Request() req: any, @Body() dto: CreateFavoriteDto) {
        return this.userService.addFavoriteItem(req, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/favorite/all')
    deleteFavoriteAll(@Request() req: any) {
        return this.userService.deleteFavoriteAll(req)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/favorite/:id')
    deleteFavoriteOne(@Request() req: any, @Param('id') id:string) {
        return this.userService.deleteFavoriteOne(req, id)
    }

    

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAccount(@Request() req: any, @Body() dto: DeleteUserDto) {
        return this.userService.deleteAccount(req, dto)
    }

    @Get('/find/:id')
    getOne(@Param('id') id:ObjectId) {
        return this.userService.getOne(id);
    }

    @Get('/find/public/:id')
    getPublicAccount(@Param('id') id:ObjectId) {
        return this.userService.getOnePublic(id);
    }


}