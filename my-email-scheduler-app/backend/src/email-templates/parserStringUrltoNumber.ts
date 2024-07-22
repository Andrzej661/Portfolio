import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class ParseStringUrlToNumber {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}
