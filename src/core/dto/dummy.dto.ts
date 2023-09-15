import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDummyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
