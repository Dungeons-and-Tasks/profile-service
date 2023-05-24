import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryEntitiesDTO } from '@/common/dto';

enum OrderBy {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export class QueryProfilesDTO extends QueryEntitiesDTO {
  @IsEnum(OrderBy)
  @IsOptional()
  order_by?: OrderBy;

  @IsString()
  @IsOptional()
  name?: string;
}
