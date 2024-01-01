import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) { }

  @Transactional()
  async updateProfile(request, updateProfileDTO: UpdateProfileDTO) {
    const { id } = request.user;
    const { firstName, lastName, phone, email: newEmail } = updateProfileDTO;

    const userInfo = await this.userInfoRepository.findOne({
      where: {
        id: id,
      },
    });

    if (firstName) {
      userInfo.firstName = firstName;
    }

    if (lastName) {
      userInfo.lastName = lastName;
    }

    if (phone) {
      userInfo.phone = phone;
    }

    if (newEmail && newEmail !== userInfo.email) {
      userInfo.email = newEmail;
      userInfo.emailVerified = false;
    }

    await this.userInfoRepository.save(userInfo);
  }

  @Transactional()
  async getProfile(request) {
    const { id } = request.user
    return await this.userInfoRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
