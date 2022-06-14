import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import {Model, ObjectId} from "mongoose"
import { Basket, BasketDocument } from "./schemas/basket.schema";
import { Favorite, FavoriteDocument } from "./schemas/favorite.schema";
import { FileService, FileType } from "src/files/file.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt"
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from '@nestjs/jwt';
import { DeleteUserDto } from "./dto/delete-user.dto";
import { ChangeUserPasswordDto } from "./dto/change-password.dto";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { DeleteItemDto } from "./dto/delete-item.dto";
import { ChangeUserDataDto } from "./dto/change-data.dto";
import { ChangeUserPhotoDto } from "./dto/change-photo.dto";
import { Clothing, ClothingDocument } from "src/clothing/schemas/clothing.schema";
import { RegisterUserDto } from "src/auth/dto/register-user.dto";
import { UpdateUserDataDto } from "./dto/update-userData.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
        @InjectModel(Clothing.name) private clothingModel: Model<ClothingDocument>,
        private fileService: FileService,
        private jwtService: JwtService
    ) {}

    async register(dto: RegisterUserDto, avatar, back): Promise<User> {
        try {
            const avatarPath = this.fileService.createFile(FileType.AVATAR, avatar);
            const backPath = this.fileService.createFile(FileType.BACK, back);
            const hashPassword = await bcrypt.hash(dto.password, 5);
            const {password, ...result} = dto;
            result['password'] = hashPassword;
            const user = await this.userModel.create({...result, avatar: avatarPath, back: backPath});
            return user;
        } catch (e) {
            throw new HttpException("Неверные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    // async login(dto: LoginUserDto, response): Promise<any> {
    //     try {
    //         const user = await this.userModel.findOne({email: dto.email})
    //         if (!user) {
    //             throw new HttpException(`Пользователь не найден!`, HttpStatus.BAD_REQUEST)
    //         }

    //         const isMatch = await bcrypt.compare(dto.password, user.password)

    //         if (!isMatch) {
    //             throw new HttpException("Неверный email или пароль!", HttpStatus.BAD_REQUEST)
    //         }

    //         const jwt = await this.jwtService.signAsync({userId: user.id})

    //         // response.cookie('jwt', jwt, {httpOnly: true})

    //         // return {
    //         //     message: "Success!"
    //         // };

            

    //         return response.cookie('jwt', jwt, {httpOnly: true})

    //     } catch (e) {
    //         throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    //     }
    // }

    async user(request): Promise<any> {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.userModel.findById(data.userId)

            return user;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    async logout(response): Promise<any> {
        try {
            response.clearCookie('jwt')

            return {
                message: 'Success Logout!'
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async updateUserData(req: any, dto: UpdateUserDataDto): Promise<any> {
        try {
            const user = await this.userModel.findByIdAndUpdate(req.user["_id"], dto)
            return user;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changePassword(dto: ChangeUserPasswordDto): Promise<any> {
        try {
            const user = await this.userModel.findOne({email: dto.email})

            if(!user) {
                throw new HttpException(`Пользователь не найден!`, HttpStatus.BAD_REQUEST)
            }

            const newHashPassword = await bcrypt.hash(dto.password, 5);

            user.set({
                password: newHashPassword
            })
            
            await user.save();

            return user;

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changeAvatarData(req: any, dto: ChangeUserPhotoDto, avatar): Promise<any> {
        try {
            const avatarNewPath = this.fileService.createFile(FileType.AVATAR, avatar);
            const user = await this.userModel.findById(req.user["_id"])

            user.set({
                avatar: avatarNewPath
            })
            await user.save()

            this.fileService.removeFile(dto.oldPath)
            
            return {
                message: "Avatar changed!"
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changeBackData(req: any, dto: ChangeUserPhotoDto, back): Promise<any> {
        try {
            const backNewPath = this.fileService.createFile(FileType.BACK, back);
            const user = await this.userModel.findById(req.user["_id"])

            user.set({
                back: backNewPath
            })
            await user.save()

            this.fileService.removeFile(dto.oldPath)
            
            return {
                message: "Back changed!"
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    // async changeName(dto: ChangeUserDataDto): Promise<any> {
    //     try {
    //         const user = await this.userModel.findById(dto.id)
    //         user.set({
    //             name: dto.data
    //         })
    //         await user.save()
    //         return {
    //             message: "Name changed!"
    //         };
    //     } catch (e) {
    //         throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async changeAbout(dto: ChangeUserDataDto): Promise<any> {
    //     try {
    //         const user = await this.userModel.findById(dto.id)
    //         user.set({
    //             about: dto.data
    //         })
    //         await user.save()
    //         return {
    //             message: "About changed!"
    //         };
    //     } catch (e) {
    //         throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async changeSocial(dto: ChangeUserDataDto): Promise<any> {
    //     try {
    //         const user = await this.userModel.findById(dto.id)
    //         user.set({
    //             social: dto.data
    //         })
    //         await user.save()
    //         return {
    //             message: "Social changed!"
    //         };
    //     } catch (e) {
    //         throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    //     }
    // }

    async addBasketItem(req: any, dto: CreateBasketDto): Promise<Basket> {
        try {
            const user = await this.userModel.findById(req.user["_id"])
            const basketItem = await this.basketModel.create({...dto})
            user.basket.push(basketItem._id)
            await user.save();
            return basketItem;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteBasketOne(req: any, id: string): Promise<any> {
        try {
            const removeItem = await this.userModel.findOneAndUpdate(
                {
                    _id: req.user["_id"]
                },
                {
                    $pull: {
                        basket: id
                    }
                }
            )
            await this.basketModel.deleteOne({_id: id})

            return removeItem;

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteBasketAll(req: any): Promise<any> {
        try {
            const removeItems = await this.userModel.findById(req.user["_id"])
            await this.basketModel.deleteMany({_id: removeItems['basket']})
            removeItems.set({
                basket: []
            })
            await removeItems.save()

            return {
                message: "Success!"
            };

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async addFavoriteItem(req:any, dto: CreateFavoriteDto): Promise<Favorite> {
        try {
            const user = await this.userModel.findById(req.user["_id"])
            const favoriteItem = await this.favoriteModel.create({...dto})
            user.favorite.push(favoriteItem._id)
            await user.save();
            return favoriteItem;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteFavoriteOne(req: any, id: string): Promise<any> {
        try {
            const removeItem = await this.userModel.findOneAndUpdate(
                {
                    _id: req.user["_id"]
                },
                {
                    $pull: {
                        favorite: id
                    }
                }
            )
            await this.favoriteModel.deleteOne({_id: id})

            return removeItem;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteFavoriteAll(req: any): Promise<any> {
        try {
            const removeItems = await this.userModel.findById(req.user["_id"])
            await this.favoriteModel.deleteMany({_id: removeItems['favorite']})
            removeItems.set({
                favorite: []
            })
            await removeItems.save()

            return {
                message: "Success!"
            }

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteAccount(req: any, dto: DeleteUserDto): Promise<any> {
        try {
            const user = await this.userModel.findById(req.user["_id"])

            if (!await bcrypt.compare(dto.password, user.password)) {
                throw new HttpException("Неверный пароль!", HttpStatus.BAD_REQUEST)
            }

            this.fileService.removeFile(user.avatar)
            this.fileService.removeFile(user.back)
            const deleteUser = await this.userModel.deleteOne({_id: req.user["_id"]})
            
            return deleteUser;

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getOne(id: ObjectId): Promise<User> {
        try {
            const user = await (await this.userModel.findById(id).populate('favorite')).populate('basket')
            return user;
        }
        catch (e) {
            throw new HttpException("Пользователь не найден!", HttpStatus.NOT_FOUND)
        }
    }

    async getOnePublic(id: ObjectId): Promise<any> {
        try {
            const user = await this.userModel.findById(id)
            const {password, ...result} = user;
            return result;
        }
        catch (e) {
            throw new HttpException("Пользователь не найден!", HttpStatus.NOT_FOUND)
        }
    }

    async findOne(email: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({email: email})
            return user;
        } catch (e) {
            throw new HttpException("Пользователь не найден!", HttpStatus.NOT_FOUND)
        }
    }

    async getBasket(req: any): Promise<any> {
        try {
            const user = await this.userModel.findById(req.user["_id"])
            const ourBasket = await this.basketModel.find({_id: user['basket']})

            // YOU NEED TO ADD EXRTA CODE HERE
            var vul = ourBasket.map(function(num) {
                return num.clothingId;
                })
            var vulTwo = ourBasket.map(function(num) {
                return {clothingId: num.clothingId, addOption: num._id};
                })

            let uniqueChars = [...new Set(vul)];
            const list = vulTwo.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t.clothingId) === JSON.stringify(v.clothingId)))===i)

            const clothing = await this.clothingModel.find({_id: uniqueChars}).populate('comments')
            
            
            let chars = [];
            let i:number = 0
            clothing.map(function(itemClothing) {
                chars.push({...itemClothing['_doc'], addOption: list[i]['addOption']})
                return i++
            })

            return chars;
        } catch (e) {
            throw new HttpException("Что-то пошло не так", HttpStatus.NOT_FOUND)
        }
    }

    async getBasketItem(id: ObjectId): Promise<any> {
        try {
            const ourBasket = await this.basketModel.findOne({_id: id})

            // YOU NEED TO ADD EXRTA CODE HERE


            return ourBasket;
        } catch (e) {
            throw new HttpException("Что-то пошло не так", HttpStatus.NOT_FOUND)
        }
    }



    async getFavorite(req: any): Promise<any> {
        try {
            const user = await this.userModel.findById(req.user["_id"])
            const ourFavorite = await this.favoriteModel.find({_id: user['favorite']})

            var vul = ourFavorite.map(function(num) {
                return num.favoriteId;
                })
            var vulTwo = ourFavorite.map(function(num) {
                return {favoriteId: num.favoriteId, addOption: num._id};
                })

            let uniqueChars = [...new Set(vul)];
            const list = vulTwo.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t.favoriteId) === JSON.stringify(v.favoriteId)))===i)

            const clothing = await this.clothingModel.find({_id: uniqueChars}).populate('comments')
            
            
            let chars = [];
            let i:number = 0
            clothing.map(function(itemClothing) {
                chars.push({...itemClothing['_doc'], addOption: list[i]['addOption']})
                return i++
            })

            return chars;
        } catch (e) {
            throw new HttpException("Что-то пошло не так", HttpStatus.NOT_FOUND)
        }
    }

    async getFavoriteItem(id: ObjectId): Promise<any> {
        try {
            const ourFavorite = await this.favoriteModel.findOne({_id: id})

            // YOU NEED TO ADD EXRTA CODE HERE

            
            return ourFavorite;
        } catch (e) {
            throw new HttpException("Что-то пошло не так", HttpStatus.NOT_FOUND)
        }
    }

}