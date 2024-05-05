import { PartialType } from '@nestjs/swagger';
import { CreateTodoListDto } from './create-todo-list.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  @IsString()
  @IsOptional()
  isCompleted?: boolean;
}
