import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password)
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto
    ) {
        return this.userService.update(parseInt(id), body)
    }
}