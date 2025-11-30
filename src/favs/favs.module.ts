import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { InMemoryFavoriteRepository } from 'src/db/favorite/in-memory.favorite.repository';

@Module({
  controllers: [FavsController],
  providers: [
    { provide: 'FAVS_REPOSITORY', useClass: InMemoryFavoriteRepository },
    FavsService,
  ],
  exports: ['FAVS_REPOSITORY'],
})
export class FavsModule {}
