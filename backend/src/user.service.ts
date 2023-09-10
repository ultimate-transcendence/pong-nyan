import { Injectable } from '@nestjs/common';
import { UserInfo, IntraId} from 'src/type/userType';
import { SocketId, Socket } from 'src/type/socketType';
import { JwtService } from '@nestjs/jwt';
import { PnPayloadDto } from 'src/dto/pnPayload.dto';
import * as cookie from 'cookie';


@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService) {}

    public getIntraId(clientId: SocketId) { return this.idMap.get(clientId); }
    public getUserInfo(intraId: number) { return this.userMap.get(intraId); }

    public checkPnJwt(client: Socket) {
      const cookies = client.handshake.headers.cookie;
      if (!cookies) {
        console.error('Cookies not found');
        return undefined;
      }
      const pnJwtCookie = cookie.parse(cookies)['pn-jwt'];
      if (!pnJwtCookie) {
        console.error('JWT not found');
        return undefined;
      }

      try {
        const payload: PnPayloadDto = this.jwtService.verify<PnPayloadDto>(pnJwtCookie);
        if (payload.exp * 1000 < Date.now()) {
          console.error('JWT expired');
          return undefined;
        }
        return payload;
      } catch (err) {
        console.error('JWT verification failed', err);
        return undefined;
      }
    }

    public setUserMap(intraId : IntraId, userInfo: UserInfo) {
      this.userMap.set(intraId, userInfo);
    }

    public setIdMap(clientId: SocketId, intraId: IntraId) {
      console.log('(Before) setIdMap idMap : ', this.idMap);
      this.idMap.set(clientId, intraId);
      console.log('(After) setIdMap idMap : ', this.idMap);
    }

    deleteUserMap(clientId: SocketId) {
      // TODO: 다시 생각해보기
      console.log('deleteUserMap', clientId);
      // const intraId = this.idMap.get(clientId);
      // this.idMap.delete(clientId);
      // this.userService.deleteUserMap(intraId);
    }

    public deleteIdMap(clientId: SocketId) {
      console.log('(Before) deleteIdMap : ', this.idMap);
      this.idMap.delete(clientId);
      console.log('(After) deleteIdMap : ', this.idMap);
    }

    public leaveGameRoom(intraId: IntraId) {
      const userInfo = this.userMap.get(intraId);
      if (!userInfo) return ;
      userInfo.gameRoom = '';
    }

    /* -------------------------------------------------------------------- */

    private userMap = new Map<number, UserInfo>();
    private idMap = new Map<SocketId, IntraId>();
}
