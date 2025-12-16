import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
// import { InMemoryTrackRepository } from 'src/db/track/in-memory.track.repository';
import { FavsModule } from 'src/favs/favs.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaTrackRepository } from 'src/db/track/prisma.track.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => FavsModule)],
  controllers: [TrackController],
  providers: [
    {
      provide: 'TRACK_REPOSITORY',
      useClass: PrismaTrackRepository, // InMemoryTrackRepository
    },
    TrackService,
  ],
  exports: ['TRACK_REPOSITORY'],
})
export class TrackModule {}
