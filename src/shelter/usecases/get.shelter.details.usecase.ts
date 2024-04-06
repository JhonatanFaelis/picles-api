
import { IUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";
import { ShelterRepository } from "../shelter.repository";
import ShelterTokens from "../shelter.tokens";
import IShelterRepository from '../interfaces/shelter.repository.interface';
import { Inject } from '@nestjs/common';

export default class GetShelterDetailsUseCase implements IUseCase<null, GetShelterDetailsUseCaseOutput> {
    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly ShelterRepository: IShelterRepository,
    ) { }

       async run(input: null): Promise<GetShelterDetailsUseCaseOutput>{
            const shelter = await this.ShelterRepository.get();
            console.log(shelter)
            return new GetShelterDetailsUseCaseOutput({
                shelterName : shelter.name,
                shelterEmail : shelter.email,
                shelterPhone : shelter.phone,
                shelterWhatsApp : shelter.whatsApp,
                createdAt : shelter.createdAt,
                updatedAt : shelter.updatedAt
            });
        }
}