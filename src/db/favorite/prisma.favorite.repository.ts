import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IFavoriteRepository } from './favorite.repository.interface';
import { Album, Artist, Track } from '@prisma/client';
import { Favorites as DomainFavorites } from 'src/interfaces/favs.interface';

@Injectable()
export class PrismaFavoriteRepository implements IFavoriteRepository {
  constructor(private prisma: PrismaService) {}

  private async getFavs() {
    const favs = await this.prisma.favorites.findFirst({
      include: { artists: true, albums: true, tracks: true },
    });
    if (favs) return favs;
    return this.prisma.favorites.create({
      data: {},
      include: { artists: true, albums: true, tracks: true },
    });
  }

  async getAll(): Promise<DomainFavorites> {
    const favs = await this.getFavs();
    return {
      artists: favs.artists.map((x: Artist) => x.id),
      albums: favs.albums.map((x: Album) => x.id),
      tracks: favs.tracks.map((x: Track) => x.id),
    };
  }

  async addTrack(id: string): Promise<boolean> {
    try {
      const favs = await this.getFavs();
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { tracks: { connect: { id } } },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteTrack(id: string): Promise<boolean> {
    try {
      const favs = await this.getFavs();
      const isPresent = favs.tracks.some((t: Track) => t.id === id);
      if (!isPresent) return false;

      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { tracks: { disconnect: { id } } },
      });
      return true;
    } catch {
      return false;
    }
  }

  async addAlbum(id: string): Promise<boolean> {
    try {
      const favs = await this.getFavs();
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { albums: { connect: { id } } },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteAlbum(id: string): Promise<boolean> {
    try {
      const favs = await this.getFavs();
      if (!favs.albums.some((a) => a.id === id)) return false;
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { albums: { disconnect: { id } } },
      });
      return true;
    } catch {
      return false;
    }
  }

  async addArtist(id: string): Promise<boolean> {
    try {
      const favs = await this.getFavs();
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { artists: { connect: { id } } },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteArtist(id: string): Promise<boolean> {
    try {
      const favs = await this.getFavs();
      if (!favs.artists.some((a) => a.id === id)) return false;
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { artists: { disconnect: { id } } },
      });
      return true;
    } catch {
      return false;
    }
  }
}
