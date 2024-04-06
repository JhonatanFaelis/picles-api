import { Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import UpdateHelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";

@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateShelterDetailsUseCaseInput,UpdateShelterDetailsUseCaseOutput>{
    run(input: UpdateShelterDetailsUseCaseInput): Promise<UpdateHelterDetailsUseCaseOutput> {
        throw new Error("Method not implemented.");
    }
    
}