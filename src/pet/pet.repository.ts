import { InjectModel } from "@nestjs/mongoose";
import IPetRepository from "./interfaces/pet.repository.interface";
import { Pet } from "./schemas/pet.schemas";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";


@Injectable()
export default class PetRepository implements IPetRepository {


    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>
    ) { }


    async getById(id: string): Promise<Pet> {
        return await this.petModel.findById({_id: id})
    }

    async create(data: Partial<Pet>): Promise<Pet> {

        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updateddAt: new Date()
        })
    }

}