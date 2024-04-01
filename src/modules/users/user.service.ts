import { Cache } from '@nestjs/cache-manager';
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export type ResponseDeleteUser = {
  deleted: boolean;
};

export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly cacheService: Cache,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async find(): Promise<User[]> {
    return await this.GetUsers();
  }

  async GetUserById(uid: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await this.userModel.findById(uid));
      }, 5000);
    });
  }

  async GetUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await this.userModel.find().exec());
      }, 5000);
    });
  }

  async findById(uid: string): Promise<User> {
    const response = await this.GetUserById(uid);
    return response;
  }

  async update(uid: string, body: Partial<User>): Promise<User> {
    return await this.userModel.findByIdAndUpdate(uid, body, { new: true });
  }

  async delete(uid: string): Promise<ResponseDeleteUser> {
    try {
      await this.userModel.findByIdAndDelete(uid);
      return { deleted: true };
    } catch (err) {
      throw new BadRequestException(
        'Não foi possível deletar um usuário com o UID informado!',
      );
    }
  }
}
