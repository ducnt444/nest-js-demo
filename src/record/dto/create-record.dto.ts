import { IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
