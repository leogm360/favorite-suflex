import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const passwordsMatch = await bcrypt.compare(
      password,
      user?.password as string,
    );

    if (!(user && passwordsMatch)) {
      throw new Error('Wrong email or password.');
    }

    const payload = { userId: user.id, sub: user.name };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
