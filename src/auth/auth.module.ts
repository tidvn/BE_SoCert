import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { PassportModule } from '@nestjs/passport';
import { jwtModule } from 'src/config/config.jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([UserInfo]),
    jwtModule,
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
