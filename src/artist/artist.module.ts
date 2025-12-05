import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { InMemoryArtistRepository } from 'src/db/artist/in-memory.artist.repository';
import { FavsModule } from 'src/favs/favs.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [
    forwardRef(() => FavsModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [ArtistController],
  providers: [
    { provide: 'ARTIST_REPOSITORY', useClass: InMemoryArtistRepository },
    ArtistService,
  ],
  exports: ['ARTIST_REPOSITORY'],
})
export class ArtistModule {}
