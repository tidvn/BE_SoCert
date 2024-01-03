import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage } from 'canvas';

@Injectable()
export class ImageService {
  async createCertificate(id: string) {
    const certificateArray = [
      {
        name: 'Phùng Tiến Dũng',
        date: '01/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Nguyễn Thị Hồng',
        date: '02/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Trần Văn Minh',
        date: '03/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Lê Thị Lan Anh',
        date: '04/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Nguyễn Văn Bình',
        date: '05/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Phạm Thị Thu Hương',
        date: '06/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Trần Đức Thịnh',
        date: '07/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Vũ Thị Thanh Thảo',
        date: '08/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Ngô Văn Tuấn',
        date: '09/01/2024',
        signature: 'Authenticated by SoCert',
      },
      {
        name: 'Lê Thị Kim Ngân',
        date: '10/01/2024',
        signature: 'Authenticated by SoCert',
      },
    ];

    const data = certificateArray[id];
    const template = {
      backgroundUrl: 'https://i.imgur.com/rJrxCWK.png',
      size: { height: 2000, width: 1414 },
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
    };

    const canvas = createCanvas(template.size.height, template.size.width);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      await loadImage(template.backgroundUrl),
      0,
      0,
      canvas.width,
      canvas.height,
    );
    template.atributtes.forEach((item) => {
      ctx.font = item.font;
      ctx.fillText(data[item.name], item.x, item.y);
    });

    return canvas.toBuffer();
  }
}
