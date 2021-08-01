import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async existsByEmail(email: string) {
    return await this.userModel.exists({ email });
  }

  async createUser(user: CreateUserDto) {
    return await this.userModel.create(user);
  }

  async findUserByIdWithoutPassword(userId: string) {
    return await this.userModel.findById(userId).select('-password').exec();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
