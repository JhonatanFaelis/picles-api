import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatePetUseCase from './useCases/create.pet.usecase';
import PetRepository from './pet.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schemas';
import GetPetByIdUseCase from './useCases/get.pet.by.id.usecase';
import UpdatePetUseCase from './useCases/update.pet.usecase';
import DeletePetUseCase from './useCases/delete.pet.usecase';
import AppTokens from 'src/app.tokens';
import FileService from 'src/file.service';

@Module({
  controllers: [PetController],
  imports :[MongooseModule.forFeature([{name: Pet.name, schema : PetSchema}])],
  providers :[
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase,
    },
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository,
    },
    {
      provide: PetTokens.getPetByIdUseCase,
      useClass: GetPetByIdUseCase,
    },
    {
      provide: PetTokens.updatePetUseCase,
      useClass: UpdatePetUseCase,
    },
    {
      provide: PetTokens.deletePetUseCase,
      useClass: DeletePetUseCase,
    },
    {
      provide: PetTokens.updatePetPhotoUseCase,
      useClass: UpdatePetUseCase,
    },
    {
      provide: AppTokens.fileService,
      useClass: FileService,
    },
  ]
})
export class PetModule {}
