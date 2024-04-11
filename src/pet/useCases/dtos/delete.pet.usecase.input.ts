export default class DeletePetUseCaseInput{
    id : string;

    constructor(data: Partial<DeletePetUseCaseInput>){
        Object.assign(this,data)
    }
}