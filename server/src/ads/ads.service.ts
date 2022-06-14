import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FileService, FileType } from "src/files/file.service";
import { Ads, AdsDocument } from "./schemas/ads.schema";
import {Model, ObjectId} from "mongoose"
import { CreateAdsDto } from "./dto/create-ads.dto";

@Injectable()
export class AdsService {

    constructor(
        @InjectModel(Ads.name) private adsModel: Model<AdsDocument>,
        private fileService: FileService
    ) {}

    async create(dto: CreateAdsDto, image): Promise<Ads> {
        try {
            const proofsPath = this.fileService.createFile(FileType.ADS, image);
            const ads = await this.adsModel.create({...dto, image: proofsPath})
            return ads;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(count = 100, offset = 0): Promise<Ads[]> {
        try {
            const ads = await this.adsModel.find().skip(Number(offset)).limit(Number(count));
            return ads;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
        
    }

    async getOne(id: ObjectId): Promise<Ads> {
        try {
            const ads = await this.adsModel.findById(id);
            return ads;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getForUser(id: number): Promise<Ads[]> {
        try {
            const ads = await this.adsModel.find({type: id})
            return ads;
        } catch (e) {
            throw new HttpException("Что-то пошло не так...", HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        try {
            const clothing = await this.adsModel.findByIdAndDelete(id);
            return clothing._id;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        } 
    }
}