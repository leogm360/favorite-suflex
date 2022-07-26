import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

import { PrismaModule } from 'src/prisma';

@Module({
  imports: [PrismaModule],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
