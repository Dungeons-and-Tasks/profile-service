import { IsArray } from 'class-validator';

export class PageDTO<T> {
  @IsArray()
  data: T[];

  meta: PageMetaDTO;

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}

export class PageMetaDTO {
  start: number;
  limit: number;
  itemCount: number;

  constructor(start: number, limit: number, itemCount: number) {
    this.start = start;
    this.limit = limit;
    this.itemCount = itemCount;
  }
}
