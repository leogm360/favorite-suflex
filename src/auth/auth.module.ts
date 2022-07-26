import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma';
import { AuthService } from './auth.service';
import { settings } from './jwt.settings';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register(settings)],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
