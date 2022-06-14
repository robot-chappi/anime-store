export class CreateClothingDto {
    readonly name:string;
    readonly description:string;
    readonly brand:string;
    readonly type:number;
    readonly delivery:string;
    readonly care:string;
    readonly price:number;
    readonly color:string[];
    readonly size:string[];
}