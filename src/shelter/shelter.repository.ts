import { InjectModel } from "@nestjs/mongoose";
import { Shelter } from "./schemas/shelter.schema";
import { Model } from "mongoose";
import IShelterRepository from "./interfaces/shelter.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ShelterRepository implements IShelterRepository {
    constructor(
        @InjectModel(Shelter.name)
        private readonly sherterModel: Model<Shelter>
    ) { }

    async get() : Promise<Shelter>{
        return await this.sherterModel.findOne();
    }

    async getAll() : Promise<Shelter []>{
        return await this.sherterModel.find()
    }
}