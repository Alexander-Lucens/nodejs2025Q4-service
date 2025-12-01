import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { InMemoryTrackRepository } from 'src/db/track/in-memory.track.repository';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [TrackController],
  providers: [
    { provide: 'TRACK_REPOSITORY', useClass: InMemoryTrackRepository },
    TrackService,
  ],
  exports: ['TRACK_REPOSITORY'],
})
export class TrackModule {}
