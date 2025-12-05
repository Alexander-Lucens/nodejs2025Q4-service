import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAlbumRepository } from 'src/db/album/album.repository.interface';
import { IFavoriteRepository } from 'src/db/favorite/favorite.repository.interface';
import { ITrackRepository } from 'src/db/track/track.repository.interface';
import {
  CreateAlbumDto,
  Album,
  UpdateAlbumDto,
} from 'src/interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('FAVS_REPOSITORY') private favsRepository: IFavoriteRepository,
    @Inject('ALBUM_REPOSITORY') private repository: IAlbumRepository,
    @Inject('TRACK_REPOSITORY') private trackRepository: ITrackRepository,
  ) {}

  async getAll() {
    const albums: Album[] = await this.repository.getAll();
    return albums;
  }

  async getById(id: string) {
    const album: Album | undefined = await this.repository.getById(id);
    if (album === undefined) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async create(data: CreateAlbumDto) {
    const album: Album = await this.repository.create(data);
    return album;
  }

  async update(id: string, data: UpdateAlbumDto) {
    const album: Album | undefined = await this.repository.getById(id);
    if (album === undefined) {
      throw new NotFoundException('Album not found');
    }
    const uAlbum: Album | undefined = await this.repository.update(id, data);
    if (uAlbum === undefined) {
      throw new NotFoundException('Album not found during update');
    }
    return uAlbum;
  }

  async delete(id: string) {
    const album = await this.repository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    await this.favsRepository.deleteAlbum(id);
    const tracks = await this.trackRepository.getAll();
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.trackRepository.update(track.id, {
          ...track,
          albumId: null,
        });
      }
    }
    await this.repository.delete(id);
  }
}
