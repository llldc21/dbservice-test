import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class ResponseDto {
  @ApiProperty()
  access_token: string;
}
