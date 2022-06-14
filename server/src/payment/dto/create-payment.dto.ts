export class CreatePaymentDto {
    readonly userId:string;
    readonly name:string;
    readonly email:string;
    readonly place:string;
    readonly card:string[];
    readonly price:string;
}