import { Module } from "@nestjs/common";
import { Ads, AdsSchema } from "./schemas/ads.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AdsController } from "./ads.controller";
import { AdsService } from "./ads.service";
import { FileService } from "src/files/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Ads.name, schema: AdsSchema}])
    ],
    controllers: [AdsController],
    providers: [AdsService, FileService]
})

export class adsModule {}