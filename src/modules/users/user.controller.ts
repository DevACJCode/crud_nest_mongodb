import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResponseDeleteUser, UserService } from './user.service';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Get()
  async find(): Promise<User[]> {
    return await this.userService.find();
  }

  @Get(':id')
  async findById(@Param() params: { uid: string }): Promise<User> {
    return await this.userService.findById(params.uid);
  }

  @Patch(':uid')
  async update(
    @Param() params: { uid: string },
    @Body() user: User,
  ): Promise<User> {
    return await this.userService.update(params.uid, user);
  }

  @Delete(':uid')
  async delete(@Param() params: { uid: string }): Promise<ResponseDeleteUser> {
    return await this.userService.delete(params.uid);
  }
}
