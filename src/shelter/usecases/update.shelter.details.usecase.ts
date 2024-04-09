import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import UpdateHelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import ShelterTokens from "../shelter.tokens";
import IShelterRepository from "../interfaces/shelter.repository.interface";


@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateShelterDetailsUseCaseInput,UpdateShelterDetailsUseCaseOutput>{
    
    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository : IShelterRepository
    ){

    }

    async run(input: UpdateShelterDetailsUseCaseInput): Promise<UpdateShelterDetailsUseCaseOutput> {
        await this.shelterRepository.updated(input)

        const shelter = await this.shelterRepository.get()

        return new UpdateShelterDetailsUseCaseOutput({
            ...shelter
        })
    }
    
}