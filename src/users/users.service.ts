import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, name, password } = createUserInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      email,
      name,
      password: hashedPassword,
    };

    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw Error(`User with id ${id} was not found.`);
    }

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const { email, name, password } = updateUserInput;

    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });

    if (!userToUpdate) {
      throw Error(`User with id ${id} was not found.`);
    }

    const data = {
      email: email ? email : userToUpdate?.email,
      name: name ? name : userToUpdate?.name,
      password: password
        ? await bcrypt.hash(password, 10)
        : userToUpdate?.password,
    };

    const updatedUser = this.prisma.user.update({ where: { id }, data });

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw Error(`User with id ${id} was not found.`);
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
