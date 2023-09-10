import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'src/type/socketType';
import { UserService } from 'src/user.service';
import { PnJwtPayload, PnPayloadDto } from 'src/dto/pnPayload.dto';
import { UseGuards } from '@nestjs/common';
import { Gateway2faGuard } from 'src/guard/gateway2fa.guard';

@UseGuards(Gateway2faGuard)
@WebSocketGateway({
  cors: { origin: '*' },
  path: '/socket/',
  cookie: true,
})
export class Google2faGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('auth-set-map')
  handleAuthSetMap(@ConnectedSocket() client: Socket, @PnJwtPayload() payload: PnPayloadDto) {
    console.log('handleAuthSetMap client.id intraId', client.id, payload.intraId);
    this.userService.setIdMap(client.id, payload.intraId);
  }

  // @SubscribeMessage('auth-set-map-payload')
  // handleAuthSetMapPayload(@ConnectedSocket() client: Socket, @PnJwtPayload() payload: PnPayloadDto) {
  //   console.log('handleAuthSetMapPayload client.id', client.id);
  //   if (!payload) {
  //     console.log('payload null', payload);
  //     return ;
  //   }
  //   console.log('handleAuthSetMapPayload client.id intraId', client.id, payload.intraId);
  //   this.userService.setIdMap(client.id, payload.intraId);
  // }
}
