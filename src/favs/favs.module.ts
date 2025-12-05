import { forwardRef, Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
// import { InMemoryFavoriteRepository } from 'src/db/favorite/in-memory.favorite.repository';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaFavoriteRepository } from 'src/db/favorite/prisma.favorite.repository';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavsController],
  providers: [
    {
      provide: 'FAVS_REPOSITORY',
      useClass: PrismaFavoriteRepository, //InMemoryFavoriteRepository
    },
    FavsService,
  ],
  exports: ['FAVS_REPOSITORY'],
})
export class FavsModule {}
