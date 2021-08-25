import {UserDtoType} from '../types/auth.types'

export default class UserDto {
    id;
    email;
    isActivated;

    constructor(model: UserDtoType) {
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}