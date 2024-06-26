import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetUseCaseInput from "./dtos/update.pet.usecase.input";
import UpdatePetUseCaseOutput from "./dtos/uptade.pet.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schemas";
import AppTokens from "src/app.tokens";
import IFileService from "src/interface/file.service.interface";


@Injectable()
export default class UpdatePetUseCase implements IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService : IFileService
    ) { }

    async run(input: UpdatePetUseCaseInput): Promise<UpdatePetUseCaseOutput> {
        let pet = await this.getPetById(input.id)
        if (!pet)
            throw new PetNotFoundError();

        await this.petRepository.update({
            ...input,
            _id: input.id
        })

        pet = await this.getPetById(input.id);

        const petPhoto = !!pet.photo ? (await this.fileService.readFile(pet.photo)).toString('base64') : null;

        return new UpdatePetUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: petPhoto,
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