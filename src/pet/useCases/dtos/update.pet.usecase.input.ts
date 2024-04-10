export default class UpdatePetUseCaseInput{
    id: string;
    name: string;
    type: string;
    size: string;
    gender:string;
    bio: string;
    photo: string;
    createdAt: Date;
    updatedAt : Date;

    constructor(data: Partial<UpdatePetUseCaseInput>){
        Object.assign(this,data)
    }
}