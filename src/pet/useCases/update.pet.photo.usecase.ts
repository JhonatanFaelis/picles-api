import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetPhotoUseCaseInput from "./dtos/update.pet.photo.usecase.input";
import UpdatePetPhotoUseCaseOutput from "./dtos/update.pet.photo.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schemas";
import UpdatePetUseCaseOutput from "./dtos/uptade.pet.usecase.output";
import AppTokens from "src/app.tokens";
import IFileService from "src/interface/file.service.interface";

@Injectable()
export default class UpdatePetPhotoUseCase implements IUseCase<UpdatePetPhotoUseCaseInput,UpdatePetPhotoUseCaseOutput>{

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,
        @Inject(AppTokens.fileService)
        private readonly fileService : IFileService
    ) { }

   async run(input: UpdatePetPhotoUseCaseInput): Promise<UpdatePetPhotoUseCaseOutput> {
        let pet = await this.getPetById(input.id)
        if (!pet)
            throw new PetNotFoundError();

        await this.petRepository.update({
            _id : input.id,
            photo : input.photoPatch
        })

        const photo = await this.fileService.readFile(input.photoPatch)

        return new UpdatePetUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: photo.toString('base64'),
            createdAt: pet.createdAt,
            updatedAt: pet.updateddAt
        })
    }





    private async getPetById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.getById(id)
        } catch (error) {
            return null;
        }
    }
}