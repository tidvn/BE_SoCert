import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { OrganizationMember } from 'src/organization/entities/organization-member.entity';
import { UserState } from 'src/user/entities/user_state.entity';
import { isNil } from 'lodash';
import { CreateCertificateCollectionDTO } from './dto/createCertificateCollection';
import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    @InjectRepository(CertificateTemplate)
    private readonly certificateTemplateRepository: Repository<CertificateTemplate>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) { }

  async init() {
    const certificateTemplate = [
      {
        name: 'certificate of participation in the event',
        background: 'https://i.imgur.com/rJrxCWK.png',
        height: 2000,
        width: 1414,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '80px Arial',
            x: 680,
            y: 700,
          },
          {
            name: 'date',
            display: 'Date:',
            font: '30px Arial',
            x: 400,
            y: 1080,
          },
          {
            name: 'signature',
            display: 'Signature:',
            font: '30px Arial',
            x: 1400,
            y: 1080,
          },
        ],
        demo: {
          name: '[Full Name Here]',
          date: '[01/01/2024]',
          signature: '[Signature Here]',
        },
      },
      {
        name: 'certificate of participation in the workshop',
        background: 'https://i.imgur.com/XmorjTQ.png',
        height: 2000,
        width: 1414,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '80px Arial',
            x: 680,
            y: 680,
          },
          {
            name: 'workshop_coach',
            display: '[workshop_coach]',
            font: '30px Arial',
            x: 530,
            y: 1170,
          },
          {
            name: 'head_of_event',
            display: '[head_of_event]',
            font: '30px Arial',
            x: 1200,
            y: 1170,
          },
        ],
        demo: {
          name: '[Full Name Here]',
          workshop_coach: '[workshop_coach]',
          head_of_event: '[head_of_event]',
        },
      },
      {
        name: 'certificate of completion of the course',
        background: 'https://i.imgur.com/TVrqssc.png',
        height: 2000,
        width: 1414,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '80px Arial',
            x: 680,
            y: 680,
          },
        ],
        demo: {
          name: '[Full Name Here]',
        },
      },
      {
        name: 'certificate of any reward',
        background: 'https://i.imgur.com/0vQfvFE.png',
        height: 1414,
        width: 2000,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '100px Arial',
            x: 300,
            y: 950,
          },
        ],
        demo: {
          name: '[Full Name Here]',
        },
      },
      {
        name: 'certificate of any reward',
        background: 'https://i.imgur.com/Ygk1ywt.png',
        height: 1414,
        width: 2000,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '100px Arial',
            x: 300,
            y: 1100,
          },
        ],
        demo: {
          name: '[Full Name Here]',
        },
      },
      {
        name: 'certificate of company membership',
        background: 'https://i.imgur.com/TeUtlJt.png',
        height: 1414,
        width: 2000,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '100px Arial',
            x: 300,
            y: 1050,
          },
          {
            name: 'date',
            display: 'date:',
            font: '40px Arial',
            x: 230,
            y: 1580,
          },
        ],
        demo: {
          name: '[Full Name Here]',
          date: '[01/01/2024]',
        },
      },
    ];

    const userInfo = await this.userInfoRepository.findOne({
      where: {
        walletAddress: 'HcUY736DPeVuFSj85nufCDXCY8sLfk517DsF6GSH1yvA',
      },
    });
    const organizationMember = await this.organizationMemberRepository.find({
      where: {
        userId: userInfo.id,
      },
    });
    certificateTemplate.map(async (item) => {
      const template = new CertificateTemplate();
      template.name = item.name;
      template.organizationId = organizationMember[0].organizationId;
      template.public = true;
      template.background = item.background;
      template.height = item.height;
      template.width = item.width;
      template.atributtes = item.atributtes;
      template.demo = item.demo;
      await this.certificateTemplateRepository.save(template);
    });
  }

  async getCertificateTemplate(request, organizationId) {
    const { user } = request;
    const organizationMember = await this.organizationMemberRepository.findOne({
      where: {
        userId: user.id,
        organizationId: organizationId,
      },
    });
    if (isNil(organizationMember)) {
      throw new Error('User is not in this organization');
    }
    const listPrivateCertificate =
      await this.certificateTemplateRepository.find({
        where: {
          organizationId: organizationId,
          public: false,
        },
      });
    const listPublicCertificate = await this.certificateTemplateRepository.find(
      {
        where: {
          public: true,
          // organizationId: Not(Equal(organizationId)),
        },
      },
    );
    return {
      privateCertificates: listPrivateCertificate,
      publicCertificates: listPublicCertificate,
    };
  }

  async createOrganizationCertificate(
    request,
    createCertificateCollection: CreateCertificateCollectionDTO,
  ) {
    const { user } = request;
    const organizationMember = await this.organizationMemberRepository.findOne({
      where: {
        userId: user.id,
        organizationId: createCertificateCollection.organizationId,
      },
    });
    if (isNil(organizationMember)) {
      throw new Error('User is not in this organization');
    }
    const certificateTemplate =
      await this.certificateTemplateRepository.findOne({
        where: {
          id: createCertificateCollection.templateId,
        },
      });
    if (isNil(certificateTemplate)) {
      throw new Error('Certificate template is not exist');
    }
    const certificate = new Certificate();
    certificate.metadata = createCertificateCollection.metadata;
    certificate.template = certificateTemplate;
    certificate.organizationId = createCertificateCollection.organizationId;
    await this.certificateRepository.save(certificate);
  }
}
