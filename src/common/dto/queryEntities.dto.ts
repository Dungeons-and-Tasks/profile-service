import { IsEnum, IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { Order } from '@/common/enums';

export abstract class QueryEntitiesDTO {
  @IsEnum(Order)
  @IsOptional()
  order_type?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  start: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(50)
  @IsNotEmpty()
  limit: number;
}
