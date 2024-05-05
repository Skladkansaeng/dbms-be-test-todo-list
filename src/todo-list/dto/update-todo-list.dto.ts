import { PartialType } from '@nestjs/swagger';
import { CreateTodoListDto } from './create-todo-list.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
