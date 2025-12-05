import {
  CreateAlbumDto,
  Album,
  UpdateAlbumDto,
} from 'src/interfaces/album.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbumRepository } from './album.repository.interface';

@Injectable()
export class InMemoryAlbumRepository implements IAlbumRepository {
  private readonly store = new Map<string, Album>();

  async getAll(): Promise<Album[]> {
    return Array.from(this.store.values());
  }

  async getById(id: string): Promise<Album | undefined> {
    return this.store.get(id);
  }

  async create(data: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      ...data,
    };
    this.store.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  async update(id: string, data: UpdateAlbumDto): Promise<Album | undefined> {
    const album = await this.getById(id);
    if (!album) return undefined;

    const updated: Album = {
      ...album,
      ...data,
    };

    this.store.set(album.id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const album = await this.getById(id);
    if (!album) return false;
    return this.store.delete(id);
  }
}
