import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IAlbumRepository } from 'src/db/album/album.repository.interface';
import { IArtistRepository } from 'src/db/artist/artist.repository.interface';
import { IFavoriteRepository } from 'src/db/favorite/favorite.repository.interface';
import { ITrackRepository } from 'src/db/track/track.repository.interface';
import { Album } from 'src/interfaces/album.interface';
import { Artist } from 'src/interfaces/artist.interface';
import { Favorites, FavoritesResponse } from 'src/interfaces/favs.interface';
import { Track } from 'src/interfaces/track.interface';

@Injectable()
export class FavsService {
  constructor(
    @Inject('FAVS_REPOSITORY') private repository: IFavoriteRepository,
    @Inject('ARTIST_REPOSITORY') private artistRepository: IArtistRepository,
    @Inject('ALBUM_REPOSITORY') private albumRepository: IAlbumRepository,
    @Inject('TRACK_REPOSITORY') private trackRepository: ITrackRepository,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const favIds: Favorites = await this.repository.getAll();
    const artists = (
      await Promise.all(
        favIds.artists.map((id) => this.artistRepository.getById(id)),
      )
    ).filter((artist): artist is Artist => artist !== undefined);

    const tracks = (
      await Promise.all(
        favIds.tracks.map((id) => this.trackRepository.getById(id)),
      )
    ).filter((track): track is Track => track !== undefined);

    const albums = (
      await Promise.all(
        favIds.albums.map((id) => this.albumRepository.getById(id)),
      )
    ).filter((album): album is Album => album !== undefined);

    return { artists, tracks, albums } as FavoritesResponse;
  }

  async addTrack(id: string): Promise<{ message: string }> {
    const trackExists = await this.trackRepository.getById(id);
    if (!trackExists) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    await this.repository.addTrack(id);
    return { message: 'Track added to favorites' };
  }

  async deleteTrack(id: string): Promise<void> {
    const isDeleted = await this.repository.deleteTrack(id);
    if (!isDeleted) {
      throw new NotFoundException('Track is not in Favorite list');
    }
  }

  async addArtist(id: string): Promise<{ message: string }> {
    const artistExists = await this.artistRepository.getById(id);
    if (!artistExists) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    await this.repository.addArtist(id);
    return { message: 'Artist added to favorites' };
  }

  async deleteArtist(id: string): Promise<void> {
    const isDeleted = await this.repository.deleteArtist(id);
    if (!isDeleted) {
      throw new NotFoundException('Artist is not in Favorite list');
    }
  }

  async addAlbum(id: string): Promise<{ message: string }> {
    const albumExists = await this.albumRepository.getById(id);
    if (!albumExists) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    await this.repository.addAlbum(id);
    return { message: 'Album added to favorites' };
  }

  async deleteAlbum(id: string): Promise<void> {
    const isDeleted = await this.repository.deleteAlbum(id);
    if (!isDeleted) {
      throw new NotFoundException('Album is not in Favorite list');
    }
  }
}
