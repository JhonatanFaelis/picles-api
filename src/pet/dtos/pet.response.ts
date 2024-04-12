import { Pet } from "../schemas/pet.schemas";

export default class PetResonse{
    id: string;
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;


    static fromPet(data: Pet): PetResonse{
        return new PetResonse({
            ...data,
            id:data._id
        })
    }

    constructor(data:Partial<PetResonse>){
        Object.assign(this,data)
    }
}