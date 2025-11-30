import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { InMemoryAlbumRepository } from 'src/db/album/in-memory.album.repository';

@Module({
  controllers: [AlbumController],
  providers: [
    { provide: 'ALBUM_REPOSITORY', useClass: InMemoryAlbumRepository },
    AlbumService,
  ],
  exports: ['ALBUM_REPOSITORY'],
})
export class AlbumModule {}
