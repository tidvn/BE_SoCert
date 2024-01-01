import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { UserState } from './entities/user_state.entity';
import { UpdateStateDTO } from './dto/update-state.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
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
  async updateUserState(request, updateStateDTO: UpdateStateDTO) {
    const { id } = request.user;
    const { orgId } = updateStateDTO;

    const userState = await this.userStateRepository.findOne({
      where: {
        userId: id,
      },
    });


    if (orgId && orgId !== userState.orgId) {
      userState.orgId = orgId;
    }

    await this.userStateRepository.save(userState);
  }

  @Transactional()
  async getProfile(request) {
    const { id } = request.user
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        id: id,
      },
    });
    const userState = await this.userStateRepository.findOne({
      where: {
        userId: id,
      },
    });
    return {
      ...userInfo,
      currentOrg: userState ? userState.orgId : null,
    }
  }
}
