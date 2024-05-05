import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { WebsocketsController } from './websockets.controller';

@Module({
  providers: [WebsocketsGateway],
  exports: [WebsocketsGateway],
  controllers: [WebsocketsController],
})
export class WebsocketsGatewayModule {}
