import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from 'src/interfaces/track.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto) {
    return this.trackService.create(body);
  }

  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTrackDto,
  ) {
    return this.trackService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.delete(id);
  }
}
