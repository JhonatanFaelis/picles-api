import CreatePetUseCaseOutput from "./create.pet.usecase.output";
import UpdatePetUseCaseOutput from "./uptade.pet.usecase.output";

export default class UpdatePetPhotoUseCaseOutput extends CreatePetUseCaseOutput{

    constructor(data : Partial<UpdatePetPhotoUseCaseOutput>){
        super(data)
        Object.assign(this,data)
    }
}