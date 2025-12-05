import {
  CreateTrackDto,
  Track,
  UpdateTrackDto,
} from 'src/interfaces/track.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ITrackRepository } from './track.repository.interface';

@Injectable()
export class InMemoryTrackRepository implements ITrackRepository {
  private readonly store = new Map<string, Track>();

  async getAll(): Promise<Track[]> {
    return Array.from(this.store.values());
  }

  async getById(id: string): Promise<Track | undefined> {
    return this.store.get(id);
  }

  async create(data: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      name: data.name,
      artistId: data.artistId,
      albumId: data.albumId,
      duration: data.duration,
    };
    this.store.set(newTrack.id, newTrack);
    return newTrack;
  }

  async update(id: string, data: UpdateTrackDto): Promise<Track | undefined> {
    const track: Track | undefined = await this.getById(id);
    if (track === undefined) return undefined;
    const updated: Track = {
      id: track.id,
      name: data.name,
      artistId: data.artistId,
      albumId: data.albumId,
      duration: data.duration,
    };
    this.store.set(track.id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const Track: Track | undefined = await this.getById(id);
    if (Track === undefined) return false;
    return this.store.delete(id);
  }
}
