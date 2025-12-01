import { Favorites } from 'src/interfaces/favs.interface';
import { Injectable } from '@nestjs/common';
import { IFavoriteRepository } from './favorite.repository.interface';

@Injectable()
export class InMemoryFavoriteRepository implements IFavoriteRepository {
  private readonly store: Favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };

  async getAll(): Promise<Favorites> {
    return this.store;
  }

  async addTrack(id: string): Promise<boolean> {
    if (this.store.tracks.includes(id)) {
      return true;
    }
    this.store.tracks.push(id);
    return true;
  }

  async deleteTrack(id: string): Promise<boolean> {
    const index = this.store.tracks.findIndex((pid) => pid === id);
    if (index === -1) {
      return false;
    }
    this.store.tracks.splice(index, 1);
    return true;
  }

  async addAlbum(id: string): Promise<boolean> {
    if (this.store.albums.includes(id)) {
      return true;
    }
    this.store.albums.push(id);
    return true;
  }

  async deleteAlbum(id: string): Promise<boolean> {
    const index = this.store.albums.findIndex((pid) => pid === id);
    if (index === -1) {
      return false;
    }
    this.store.albums.splice(index, 1);
    return true;
  }

  async addArtist(id: string): Promise<boolean> {
    if (this.store.artists.includes(id)) {
      return true;
    }
    this.store.artists.push(id);
    return true;
  }

  async deleteArtist(id: string): Promise<boolean> {
    const index = this.store.artists.findIndex((pid) => pid === id);
    if (index === -1) {
      return false;
    }
    this.store.artists.splice(index, 1);
    return true;
  }
}
