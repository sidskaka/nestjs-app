
export class CreateUserDTO {
   readonly name: string;
   readonly email: string;
   readonly password: string;
   readonly products: object;
   readonly created_at: Date;
}