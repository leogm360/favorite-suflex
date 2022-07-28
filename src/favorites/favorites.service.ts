import { Injectable } from '@nestjs/common';

import { Favorite } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateFavoriteInput } from './dto/create-favorite.input';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createFavoriteInput: CreateFavoriteInput,
  ): Promise<Favorite> {
    const {
      name,
      status,
      gender,
      image,
      species,
      type,
      created,
      episodes,
      location: { locationName, locationUrl },
      origin: { originName, originUrl },
    } = createFavoriteInput;

    const favorite = await this.prisma.favorite.upsert({
      where: { name },
      update: {
        users: { connect: { id: userId } },
      },
      create: {
        name,
        status,
        gender,
        image,
        species,
        type,
        created,
        episodes: {
          connectOrCreate: episodes.map((url) => ({
            where: { url },
            create: { url },
          })),
        },
        location: {
          connectOrCreate: {
            where: { url: locationUrl },
            create: { url: locationUrl, name: locationName },
          },
        },
        origin: {
          connectOrCreate: {
            where: { url: originUrl },
            create: { url: originUrl, name: originName },
          },
        },
        users: { connect: { id: userId } },
      },
      include: {
        episodes: true,
        location: true,
        origin: true,
      },
    });

    return favorite;
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .favorites({ include: { episodes: true, origin: true, location: true } });
  }
}
