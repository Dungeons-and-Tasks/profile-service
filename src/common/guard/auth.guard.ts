import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

import { config } from '@/config/main.config';

import { Payload } from '../interfaces';

interface LocalPayload {
  userId: string;
  roleId: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, { publicKey: config.auth.publicKey });
      const { userId, roleId } = payload as LocalPayload;
      request['payload'] = { userId, roleId } as Payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromRequest(request: FastifyRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const { access_token } = request.cookies;

    if (type === 'Bearer' && token) return token;
    else if (access_token) return access_token;
  }
}
