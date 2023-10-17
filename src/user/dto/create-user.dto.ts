import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail({ allow_display_name: true }, { message: 'is not email' })
    email: string;

    @MinLength(6, { message: 'Pass must be 6 or more symbols' })
    password: string;
}
