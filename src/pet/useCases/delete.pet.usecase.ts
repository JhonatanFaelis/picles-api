import { IUseCase } from "src/domain/iusecase.interface";
import DeletePetUseCaseInput from "./dtos/delete.pet.usecase.input";
import DeletePetUseCaseOutPut from "./dtos/delete.pet.usecase.output";
import IPetRepository from "../interfaces/pet.repository.interface";
import PetTokens from "../pet.tokens";
import { Inject } from "@nestjs/common";
import { Pet } from "../schemas/pet.schemas";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";

export default class DeletePetUseCase implements IUseCase<DeletePetUseCaseInput,DeletePetUseCaseOutPut>{

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
    ) { }

   async run(input: DeletePetUseCaseInput): Promise<DeletePetUseCaseOutPut> {
        const pet = await this.getPetById(input.id)

        if(!pet)
            throw new PetNotFoundError();

        await this.petRepository.deleteById(input.id);

        return new DeletePetUseCaseOutPut();
    }

    private async getPetById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.getById(id)
        } catch (error) {
            return null;
        }
    }

}