import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Picles é o caralho, o negocio é batata!';
  }
}
