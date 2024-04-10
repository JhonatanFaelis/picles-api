import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByIdUseCaseInput from "./dtos/get.pet.by.id.usecase.input";
import GetPetByIdUseCaseOutput from "./dtos/get.pet.by.id.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { Pet } from "../schemas/pet.schemas";
import { CustomError } from "src/domain/errors/custom.error";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";


@Injectable()
export default class GetPetByIdUseCase implements IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
    ) { }


    async run(input: GetPetByIdUseCaseInput): Promise<GetPetByIdUseCaseOutput> {
        const petById = await this.getPetById(input.id)

        if (!petById)
            throw new PetNotFoundError();

        return new GetPetByIdUseCaseOutput({
            id: petById._id,
            name: petById.name,
            type: petById.type,
            size: petById.size,
            gender: petById.gender,
            bio: petById.bio,
            photo: petById.photo,
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