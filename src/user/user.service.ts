import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { UserState } from './entities/user_state.entity';
import { UpdateStateDTO } from './dto/update-state.dto';
import { Organization } from 'src/organization/entities/organization.entity';
import { OrganizationMember } from 'src/organization/entities/organization-member.entity';
import { isNil } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) {}

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
    const { organizationId } = updateStateDTO;
    const userOrganization = await this.organizationMemberRepository.findOne({
      where: {
        userId: id,
        organizationId: organizationId,
      },
    });
    if (!userOrganization) {
      throw new Error('User is not in this organization');
    }
    const userState = await this.userStateRepository.findOne({
      where: {
        userId: id,
      },
    });
    if (isNil(userState)) {
      const newUserState = new UserState();
      newUserState.userId = id;
      newUserState.organizationId = organizationId;
      await this.userStateRepository.save(newUserState);
      return;
    }

    if (organizationId && organizationId !== userState.organizationId) {
      userState.organizationId = organizationId;
    }
    await this.userStateRepository.save(userState);
  }

  @Transactional()
  async getProfile(request) {
    const { id } = request.user;
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

    const organizations = await this.organizationRepository
      .createQueryBuilder('organization')
      .innerJoin(
        OrganizationMember,
        'orgMember',
        'orgMember.organizationId = organization.id',
      )
      .where('orgMember.userId = :id', { id })
      .getMany();
    return {
      ...userInfo,
      currentOrg: userState ? userState.organizationId : null,
      organizations: organizations,
    };
  }
}
