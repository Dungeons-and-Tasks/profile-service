import { ErisLogger } from 'eris-logger';
import { mkdir, readdir } from 'fs-extra';
import { join } from 'path';
import { config } from '@/config/main.config';

const logsDir = join(__dirname, '../../', 'logs');

readdir(logsDir).catch(() => mkdir(logsDir));

export const logger = new ErisLogger({
  terminal: { use: true },
  file: { use: !config.server.isDev, dir: 'logs/logs.log' },
});
