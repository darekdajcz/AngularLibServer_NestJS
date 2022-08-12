import { IsBoolean, IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class TaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class TaskParamDto {
  @IsUUID()
  @IsDefined()
  id: string;
}

export class QueryParamDto {
  @IsDefined()
  @IsBoolean()
  @Transform((transformFnParams) => {
    if (transformFnParams.value == 'true') return true;
    if (transformFnParams.value == 'false ') return false;
    return transformFnParams.value;
  })
  filter: boolean;

  @IsDefined()
  @IsString()
  name: string;
}