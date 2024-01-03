import { Injectable } from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationMember } from './entities/organization-member.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) { }

  async initData() {
    const companyData = [
      {
        name: 'Solana Consumer Hack 11',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_tRCZ0k2qSd5B9R334Bk7Sf3qgz4qTWdeJTycNFpdQ&s',
        email: 'info@solana.com',
        phone: '123-456-7890',
        website: 'www.solana.com',
        location: 'Global',
      },
      {
        name: 'Global Services Co.',
        image: 'https://robohash.org/set_set2/bgset_bg2/2',
        email: 'info@globalservicesco.com',
        phone: '987-654-3210',
        website: 'www.globalservicesco.com',
        location: 'London, UK',
      },
      {
        name: 'Innovate Tech Group',
        image: 'https://robohash.org/set_set2/bgset_bg2/3',
        email: 'info@innovatetechgroup.com',
        phone: '555-123-4567',
        website: 'www.innovatetechgroup.com',
        location: 'Tokyo, Japan',
      },
      {
        name: 'Eco-Friendly Solutions Ltd.',
        image: 'https://robohash.org/set_set2/bgset_bg2/4',
        email: 'info@ecofriendlysolutions.com',
        phone: '111-222-3333',
        website: 'www.ecofriendlysolutions.com',
        location: 'Sydney, Australia',
      },
      {
        name: 'Smart Innovations GmbH',
        image: 'https://robohash.org/set_set2/bgset_bg2/5',
        email: 'info@smartinnovations.com',
        phone: '333-444-5555',
        website: 'www.smartinnovations.com',
        location: 'Berlin, Germany',
      },
    ];
    const userInfo = await this.userInfoRepository.findOne({
      where: {
        walletAddress: "HcUY736DPeVuFSj85nufCDXCY8sLfk517DsF6GSH1yvA",
      },
    });
    companyData.map(async (company) => {
      const organization = new Organization();
      organization.name = company.name;
      organization.image = company.image;
      organization.email = company.email;
      organization.phone = company.phone;
      organization.website = company.website;
      organization.location = company.location;
      await this.organizationRepository.save(organization);

      const organizationMember = new OrganizationMember();
      organizationMember.organizationId = organization.id;
      organizationMember.userId = userInfo.id;
      organizationMember.role = 'Admin';
      await this.organizationMemberRepository.save(organizationMember);
    });
    return { message: 'Success' };
  }
}
