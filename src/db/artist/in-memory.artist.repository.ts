import {
  CreateArtistDto,
  Artist,
  UpdateArtistDto,
} from 'src/interfaces/artist.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtistRepository } from './artist.repository.interface';

@Injectable()
export class InMemoryArtistRepository implements IArtistRepository {
  private readonly store = new Map<string, Artist>();

  async getAll(): Promise<Artist[]> {
    return Array.from(this.store.values());
  }

  async getById(id: string): Promise<Artist | undefined> {
    return this.store.get(id);
  }

  async create(data: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: uuidv4(),
      ...data,
    };
    this.store.set(newArtist.id, newArtist);
    return newArtist;
  }

  async update(id: string, data: UpdateArtistDto): Promise<Artist | undefined> {
    const artist = await this.getById(id);
    if (!artist) return undefined;

    const updated: Artist = {
      ...artist,
      ...data,
    };

    this.store.set(artist.id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const artist = await this.getById(id);
    if (!artist) return false;
    return this.store.delete(id);
  }
}
