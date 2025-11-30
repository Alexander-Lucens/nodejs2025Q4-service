import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArtistRepository } from 'src/db/artist/artist.repository.interface';
import {
  CreateArtistDto,
  Artist,
  UpdateArtistDto,
} from 'src/interfaces/Artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ARTIST_REPOSITORY') private repository: IArtistRepository,
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
    const Artist: Artist = await this.repository.create(data);
    return Artist;
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
    const respons = await this.repository.delete(id);
    if (!respons) {
      throw new NotFoundException('Artist not found');
    }
  }
}
