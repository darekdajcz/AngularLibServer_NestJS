import { IsDefined, IsNotEmpty } from 'class-validator';

export class TaskDto {

  @IsDefined()
  @IsNotEmpty()
  name: string;
}