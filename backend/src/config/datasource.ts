import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Game } from 'src/entity/Game';
import { VRanking } from 'src/entity/VRanking';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
      entities: [ User, Game, VRanking ],
    }),
  ],
})
export class DatabaseModule {}
