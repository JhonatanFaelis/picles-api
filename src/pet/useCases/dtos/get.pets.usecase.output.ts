import PetResonse from "src/pet/dtos/pet.response";

export default class GetPetsUseCaseOutPut{
    currentPage: number;
    totalPages: number;
    items : PetResonse[]

    constructor(data: Partial<GetPetsUseCaseOutPut>){
        Object.assign(this,data);
    }
}