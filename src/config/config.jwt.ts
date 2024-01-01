import { JwtModule } from '@nestjs/jwt';
import { JWT_ACCESS_EXPIRES_IN, JWT_ACCESS_SECRET } from '../app.environment';

export const jwtModule = JwtModule.register({
  secret: JWT_ACCESS_SECRET,
  signOptions: {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  },
});
