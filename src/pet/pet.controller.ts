import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseOutput from './useCases/dtos/create.pet.usecase.output';
import PetTokens from './pet.tokens';
import CreatePetUseCaseInput from './useCases/dtos/create.pet.usecase.input';
import GetPetByIdUseCaseInput from './useCases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './useCases/dtos/get.pet.by.id.usecase.output';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetUseCaseOutput from './useCases/dtos/uptade.pet.usecase.output';
import UpdatePetUseCaseInput from './useCases/dtos/update.pet.usecase.input';
import DeletePetUseCaseOutPut from './useCases/dtos/delete.pet.usecase.output';
import DeletePetUseCaseInput from './useCases/dtos/delete.pet.usecase.input';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multers.config';
import UpdatePetPhotoUseCaseInput from './useCases/dtos/update.pet.photo.usecase.input';
import UpdatePetPhotoUseCaseOutput from './useCases/dtos/update.pet.photo.usecase.output';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Inject(PetTokens.getPetByIdUseCase)
    private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

    @Inject(PetTokens.updatePetUseCase)
    private readonly updatePetUseCase: IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput>
    
    @Inject(PetTokens.deletePetUseCase)
    private readonly deletePetUseCase: IUseCase<DeletePetUseCaseInput, DeletePetUseCaseOutPut>

    @Inject(PetTokens.updatePetPhotoUseCase)
    private readonly updatePetPhotoUseCase: IUseCase<UpdatePetPhotoUseCaseInput, UpdatePetPhotoUseCaseOutput>

    @Post()
    async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput> {
        const useCaseInput = new CreatePetUseCaseInput({
            ...input
        })
        return await this.createPetUseCase.run(useCaseInput)
    }

    @Get(':id')
    async getPetById(@Param('id') id: string): Promise<GetPetByIdUseCaseOutput> {
        try {
            const useCaseInput = new GetPetByIdUseCaseInput({ id })
            return await this.getPetByIdUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message));
        }
    }

    @Put(':id')
    async updatePet(@Body() input : UpdatePetControllerInput, @Param() id: string) : Promise<UpdatePetUseCaseOutput>{
        try {
            const useCaseInput = new UpdatePetUseCaseInput({...input, id});
            return await this.updatePetUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message));
        }
    }

    @Delete(':id')
    async deletePet(@Param() id:string) : Promise<DeletePetUseCaseOutPut>{
        try {
            const useCaseInput = new DeletePetUseCaseInput({id});
            return await this.deletePetUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message));
        }
    }

    @Patch(':id/photo')
    @UseInterceptors(FileInterceptor('photo',multerConfig))
  async  updatePhoto(
        @UploadedFile() photo: Express.Multer.File,
        @Param('id') id: string
    ){
        try {
            const useCaseInput = new UpdatePetPhotoUseCaseInput({
                id,
                photoPatch : photo.path
            })
            return await this.updatePetPhotoUseCase.run(useCaseInput)
        } catch (error) {
            
        }
    }
}
