import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { InMemoryTrackRepository } from 'src/db/track/in-memory.track.repository';

@Module({
  controllers: [TrackController],
  providers: [
    { provide: 'TRACK_REPOSITORY', useClass: InMemoryTrackRepository },
    TrackService,
  ],
  exports: ['TRACK_REPOSITORY'],
})
export class TrackModule {}
