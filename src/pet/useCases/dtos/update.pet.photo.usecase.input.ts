export default class UpdatePetPhotoUseCaseInput{
    id: string 
    photoPatch :string

    constructor (
        data: Partial<UpdatePetPhotoUseCaseInput>
    ){
      Object.assign(this,data)
    }
}