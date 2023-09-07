import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/entity/Game';
import { User } from 'src/entity/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ Game, User ]),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d'}
  })],
  providers: [GameService, GameGateway],
})
export class GameModule {}
