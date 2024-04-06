import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.tokens';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { Shelter, ShelterSchema } from './schemas/shelter.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterRepository } from './shelter.repository';
import UpdateShelterDetailsUseCase from './usecases/update.shelter.details.usecase';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Shelter.name,
      schema: ShelterSchema
    }
  ])],
  controllers: [ShelterController],
  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase,
    },
    {
      provide: ShelterTokens.shelterRepository,
      useClass: ShelterRepository
    },
    {
      provide : ShelterTokens.updateShelterDetailsUseCase,
      useClass : UpdateShelterDetailsUseCase
    }
  ]
})
export class ShelterModule { }
