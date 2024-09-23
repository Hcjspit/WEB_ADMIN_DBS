import {
  IsString,
  IsNotEmpty,
  Matches,
  MinLength,
  IsAlphanumeric,
} from "class-validator";

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  // @MinLength(4)
  // @Matches(new RegExp("((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"), {
  //   message:
  //     "password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character",
  // })
  @IsString()
  password: string;
}

export class LoginDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class AddUserDTO {}
