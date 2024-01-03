import { Injectable } from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationMember } from './entities/organization-member.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) {}

  async initData() {
    const companyData = [
      {
        name: 'Tech Solutions Inc.',
        image: 'techsolutions_logo.png',
        email: 'https://robohash.org/set_set2/bgset_bg2/1',
        phone: '123-456-7890',
        website: 'www.techsolutions.com',
        location: 'Silicon Valley, USA',
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
    companyData.map(async (company) => {
      const organization = new Organization();
      organization.name = company.name;
      organization.image = company.image;
      organization.email = company.email;
      organization.phone = company.phone;
      organization.website = company.website;
      organization.location = company.location;
      await this.organizationRepository.save(organization);
    });
    return { message: 'Success' };
  }
}
