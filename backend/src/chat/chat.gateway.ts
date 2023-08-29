import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: { origin: '*' },
  path: '/socket/',
})
export class ChatGateway {
  @SubscribeMessage('chat-message')
  handleMessage(client: any, payload: any): string {
    console.log('chat/message payload :', payload);
    return 'Hello world!';
  }
}