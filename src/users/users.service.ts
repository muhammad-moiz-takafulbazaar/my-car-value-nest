import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    repo: Repository<User>

    constructor(repo: Repository<User>) {
        this.repo = repo;
    }
}
