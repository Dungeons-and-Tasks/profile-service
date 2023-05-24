import { FastifyRequest } from 'fastify';
import { Profile } from '../../components/profiles/entities';

export interface Request extends FastifyRequest {
  userId: string;
  roleId: string;
  profile: Profile;
  headers: {
    requestId: string;
  };
}
