import { ErisEnvLoader } from 'eris-env';

const envLoader = new ErisEnvLoader({});

const prefix = {
  auth: 'AUTH',
  server: 'SERVER',
  password: 'PASSWORD',
  service: 'SERVICE',
  database: 'DATABASE',
};

export const config = {
  service: {
    name: envLoader.getEnv('string', prefix.service, 'NAME'),
    secret: envLoader.getEnv('string', prefix.service, 'KEY'),
  },
  auth: {
    publicKey: envLoader.getEnv('string', prefix.auth, 'PUBLIC_KEY'),
  },
  server: {
    host: envLoader.getEnv('string', prefix.server, 'HOST'),
    port: envLoader.getEnv('number', prefix.server, 'PORT'),
    isDev: envLoader.getEnv('boolean', prefix.server, 'IS_DEV'),
    cookie: {
      secret: envLoader.getEnv('string', prefix.server, 'COOKIE_SECRET'),
    },
  },
  database: {
    dialect: envLoader.getEnv('string', prefix.database, 'DIALECT') as 'mysql' | 'postgres',
    host: envLoader.getEnv('string', prefix.database, 'HOST'),
    port: envLoader.getEnv('number', prefix.database, 'PORT'),
    user: envLoader.getEnv('string', prefix.database, 'USER'),
    password: envLoader.getEnv('string', prefix.database, 'PASSWORD'),
    database: envLoader.getEnv('string', prefix.database, 'DATABASE'),
  },
};
