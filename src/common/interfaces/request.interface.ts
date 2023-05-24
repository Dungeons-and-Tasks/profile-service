import { FastifyRequest } from 'fastify';

export interface Request extends FastifyRequest {
  userId: string;
  roleId: string;
  headers: {
    requestId: string;
  };
}
