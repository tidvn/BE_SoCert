import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { Repository } from 'typeorm';
import { isNil } from 'lodash';
import { Network } from 'src/common/common.enum';
import { WalletSignatureDTO } from './dto/wallet-signature.dto';
import { verifyMessage } from 'src/utils/util.signature';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    private jwtService: JwtService,
  ) {}

  async getNonce(walletAddress: string): Promise<any> {
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        walletAddress: walletAddress,
      },
    });

    if (isNil(userInfo)) {
      const newUser = new UserInfo();
      newUser.walletAddress = walletAddress;
      await this.userInfoRepository.save(newUser);
      return {
        walletAddress: walletAddress,
        nonce: newUser.nonce,
      };
    }
    return {
      walletAddress: walletAddress,
      nonce: userInfo.nonce,
    };
  }

  async login(
    network: Network,
    walletSignature: WalletSignatureDTO,
  ): Promise<any> {
    const { publicAddress, signature } = walletSignature;
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        walletAddress: publicAddress,
      },
    });
    const nonce: string = userInfo.nonce;
    const verified = verifyMessage(network, nonce, signature, publicAddress);

    if (!verified) {
      throw new BadRequestException('Cannot verify wallet signature');
    }
    return this.generateTokens(userInfo);
  }

  private generateTokens(user: UserInfo): any {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      addr: user.walletAddress,
    });
    return { accessToken: accessToken };
  }
}
