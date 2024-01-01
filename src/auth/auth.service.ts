import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { Repository } from 'typeorm';
import { isNil } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { JWT_ACCESS_EXPIRES_IN, JWT_ACCESS_SECRET, WALLET_NONCE_TTL } from 'src/app.environment';
import { Network } from 'src/common/common.enum';
import { WalletSignatureDTO } from './dto/wallet-signature.dto';
import { verifyMessage } from 'src/utils/util.signature';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    private jwtService: JwtService,
  ) { }


  async getNonce(walletAddress: string): Promise<any> {
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        walletAddress: walletAddress,
      },
    });
    let nonce = await this.cacheManager.get(`nonce-${walletAddress}`);

    if (isNil(nonce)) {
      nonce = uuidv4();
      await this.cacheManager.set(
        `nonce-${walletAddress}`,
        nonce,
        WALLET_NONCE_TTL,
      );
    }

    return {
      walletAddress: walletAddress,
      nonce: nonce,
      registered: !isNil(userInfo),
    };
  }

  async login(
    network: Network,
    walletSignature: WalletSignatureDTO,
  ): Promise<any> {
    const { publicAddress, signature } = walletSignature;
    const nonce: string = await this.cacheManager.get(`nonce-${publicAddress}`);
    const verified = verifyMessage(network, nonce, signature, publicAddress);

    if (!verified) {
      throw new BadRequestException('Cannot verify wallet signature');
    }

    const userInfo = await this.userInfoRepository.findOne({
      where: {
        walletAddress: publicAddress,
      },
    });

    if (isNil(userInfo)) {
      const newUser = new UserInfo();
      newUser.walletAddress = publicAddress;
      await this.userInfoRepository.save(newUser);
      return this.generateTokens(newUser);
    }

    return this.generateTokens(userInfo);
  }

  private generateTokens(user: UserInfo): any {
    const accessToken = this.jwtService.sign({ sub: user.id, addr: user.walletAddress });
    return { accessToken: accessToken };
  }
}
