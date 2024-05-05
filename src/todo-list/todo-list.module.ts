import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { WebsocketsGatewayModule } from 'src/gatway/websockets.module';

@Module({
  imports: [WebsocketsGatewayModule],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
