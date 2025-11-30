import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITrackRepository } from 'src/db/track/track.repository.interface';
import {
  CreateTrackDto,
  Track,
  UpdateTrackDto,
} from 'src/interfaces/track.interface';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TRACK_REPOSITORY') private repository: ITrackRepository,
  ) {}

  async getAll() {
    const tracks: Track[] = await this.repository.getAll();
    return tracks;
  }

  async getById(id: string) {
    const track: Track | undefined = await this.repository.getById(id);
    if (track === undefined) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async create(data: CreateTrackDto) {
    const track: Track = await this.repository.create(data);
    return track;
  }

  async update(id: string, data: UpdateTrackDto) {
    const track: Track | undefined = await this.repository.getById(id);
    if (track === undefined) {
      throw new NotFoundException('Track not found');
    }
    const uTrack: Track | undefined = await this.repository.update(id, data);
    if (uTrack === undefined) {
      throw new NotFoundException('Track not found during update');
    }
    return uTrack;
  }

  async delete(id: string) {
    const respons = await this.repository.delete(id);
    if (!respons) {
      throw new NotFoundException('Track not found');
    }
  }
}
