import { IUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";

export default class GetShelterDetailsUseCase implements IUseCase<null,GetShelterDetailsUseCaseOutput>{
    run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
        return Promise.resolve(new GetShelterDetailsUseCaseOutput({
            shelterName : "Abrigo bingo",
            shelterEmail : "Abrigo@bingo.com.br",
            shelterPhone : "1999999",
            shelterWhatsApp : "1999999999",
            createdAt : new Date(),
            updatedAt : new Date()
        }))
    }
}