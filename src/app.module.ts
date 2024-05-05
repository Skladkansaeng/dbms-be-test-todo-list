import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoListModule } from './todo-list/todo-list.module';
import { WebsocketsGatewayModule } from './gatway/websockets.module';

@Module({
  imports: [TodoListModule, WebsocketsGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
