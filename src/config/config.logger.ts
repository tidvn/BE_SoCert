import { randomUUID } from 'node:crypto';
import { LOG_FILE_PATH } from 'src/app.environment';

const pinoHttp = {
  useLevelLabels: true,
  genReqId: (req, res) => {
    if (req.id) return req.id;
    let id = req.get('X-Request-Id');
    if (id) return id;
    id = randomUUID();
    res.header('X-Request-Id', id);
    return id;
  },
};

export const loggerOptions = {
  development: {
    pinoHttp: [
      {
        ...pinoHttp,
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            destination: LOG_FILE_PATH,
          },
        },
      },
    ],
  },
  production: {
    pinoHttp: [
      {
        ...pinoHttp,
        level: 'info',
      },
    ],
  },
};
