import { Pet } from "../schemas/pet.schemas";

export default interface IPetRepository{
    create(data : Partial<Pet>) : Promise<Pet>
    getById(id : string) : Promise<Pet>
    update(data: Partial<Pet>) : Promise<void>
    deleteById(id:string) : Promise<void>
}