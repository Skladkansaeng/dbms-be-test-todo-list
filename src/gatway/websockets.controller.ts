import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Websockets')
@Controller('websockets')
export class WebsocketsController {
  @Get('events')
  @ApiOperation({ summary: 'Get information about WebSocket events' })
  getWebSocketEventsInfo(): string {
    return `WebSocket Events:
- 'todo-subscription': Receive new data after creating a to-do.
`;
  }
}
