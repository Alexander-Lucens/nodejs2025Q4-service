import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
// import { InMemoryAlbumRepository } from 'src/db/album/in-memory.album.repository';
import { FavsModule } from 'src/favs/favs.module';
import { TrackModule } from 'src/track/track.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaAlbumRepository } from 'src/db/album/prisma.album.repository';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => FavsModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [AlbumController],
  providers: [
    {
      provide: 'ALBUM_REPOSITORY',
      useClass: PrismaAlbumRepository, // InMemoryAlbumRepository
    },
    AlbumService,
  ],
  exports: ['ALBUM_REPOSITORY'],
})
export class AlbumModule {}
