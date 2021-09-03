import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { UpdateUserDto } from "./dto/update-user.dto";

import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.findOne({ userId })
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(data): Promise<User> {
        const salt = await bcrypt.genSalt();
     const hash= await bcrypt.hash(data.password, salt)
        return this.usersRepository.create({
            status:true,
            result:{
                userId: uuidv4(),
                username:data.username,
                email:data.email,
                password:hash
            },
            message:"Register successfully..."
        })
    }

    async loginUser(data): Promise<User> { 
        const email=data.email              
         const result = await this.usersRepository.findOne({email})
        console.log(result,'email...'); 
         return result
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}