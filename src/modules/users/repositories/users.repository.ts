import { Service } from "typedi";
import { BaseRepository } from "../../../repository/base.repository";
import { Users } from "../entities/users.entity";
import { IUsers } from "../interfaces";

@Service()
export class UsersRepository extends BaseRepository {
    constructor(){
        super(Users);
    }
    async createUser(data: IUsers){
        return await this.getRepo().save(data)
    }
}