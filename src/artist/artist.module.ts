import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { InMemoryArtistRepository } from 'src/db/artist/in-memory.artist.repository';

@Module({
  controllers: [ArtistController],
  providers: [
    { provide: 'ARTIST_REPOSITORY', useClass: InMemoryArtistRepository },
    ArtistService,
  ],
  exports: ['ARTIST_REPOSITORY'],
})
export class ArtistModule {}
