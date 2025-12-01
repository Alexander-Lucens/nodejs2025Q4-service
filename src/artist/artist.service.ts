import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAlbumRepository } from 'src/db/album/album.repository.interface';
import { IArtistRepository } from 'src/db/artist/artist.repository.interface';
import { IFavoriteRepository } from 'src/db/favorite/favorite.repository.interface';
import { ITrackRepository } from 'src/db/track/track.repository.interface';
import {
  CreateArtistDto,
  Artist,
  UpdateArtistDto,
} from 'src/interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('FAVS_REPOSITORY') private favsRepository: IFavoriteRepository,
    @Inject('ARTIST_REPOSITORY') private repository: IArtistRepository,
    @Inject('TRACK_REPOSITORY') private trackRepository: ITrackRepository,
    @Inject('ALBUM_REPOSITORY') private albumRepository: IAlbumRepository,
  ) {}

  async getAll() {
    const artists: Artist[] = await this.repository.getAll();
    return artists;
  }

  async getById(id: string) {
    const artist: Artist | undefined = await this.repository.getById(id);
    if (artist === undefined) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async create(data: CreateArtistDto) {
    const artist: Artist = await this.repository.create(data);
    return artist;
  }

  async update(id: string, data: UpdateArtistDto) {
    const artist: Artist | undefined = await this.repository.getById(id);
    if (artist === undefined) {
      throw new NotFoundException('Artist not found');
    }
    const uArtist: Artist | undefined = await this.repository.update(id, data);
    if (uArtist === undefined) {
      throw new NotFoundException('Artist not found during update');
    }
    return uArtist;
  }

  async delete(id: string) {
    const respons = await this.repository.getById(id);
    if (!respons) {
      throw new NotFoundException('Artist not found');
    }
    await this.favsRepository.deleteArtist(id);

    const tracks = await this.trackRepository.getAll();
    for (const track of tracks) {
      if (track.artistId === id) {
        await this.trackRepository.update(track.id, {
          ...track,
          artistId: null,
        });
      }
    }

    const albums = await this.albumRepository.getAll();
    for (const album of albums) {
      if (album.artistId === id) {
        await this.albumRepository.update(album.id, {
          ...album,
          artistId: null,
        });
      }
    }
    await this.repository.delete(id);
  }
}
