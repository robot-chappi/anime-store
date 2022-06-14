import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/files/file.service";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { Blog, BlogSchema } from "./schemas/blog.schema";
import { CommentBlog, CommentBlogSchema } from "./schemas/comment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
        MongooseModule.forFeature([{name: CommentBlog.name, schema: CommentBlogSchema}])
    ],
    controllers: [BlogController],
    providers: [BlogService, FileService]
})

export class BlogModule {}