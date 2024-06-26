
import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByIdUseCaseInput from "./dtos/get.pet.by.id.usecase.input";
import GetPetByIdUseCaseOutput from "./dtos/get.pet.by.id.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { Pet } from "../schemas/pet.schemas";
import { CustomError } from "src/domain/errors/custom.error";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import AppTokens from "src/app.tokens";
import IFileService from 'src/interface/file.service.interface';


@Injectable()
export default class GetPetByIdUseCase implements IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly FileService : IFileService
    ) { }


    async run(input: GetPetByIdUseCaseInput): Promise<GetPetByIdUseCaseOutput> {
        const petById = await this.getPetById(input.id)

        if (!petById)
            throw new PetNotFoundError();

        const petPhoto = !!petById.photo ? (await this.FileService.readFile(petById.photo)).toString('base64') : null

        return new GetPetByIdUseCaseOutput({
            id: petById._id,
            name: petById.name,
            type: petById.type,
            size: petById.size,
            gender: petById.gender,
            bio: petById.bio,
            photo: petPhoto,
            createdAt: petById.createdAt,
            updatedAt: petById.updateddAt
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