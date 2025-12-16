import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IAlbumRepository } from './album.repository.interface';
import { Album } from '@prisma/client';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/interfaces/album.interface';

@Injectable()
export class PrismaAlbumRepository implements IAlbumRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getById(id: string): Promise<Album | undefined> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) return undefined;
    return album;
  }

  async create(data: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({ data });
  }

  async update(id: string, data: UpdateAlbumDto): Promise<Album | undefined> {
    try {
      return await this.prisma.album.update({ where: { id }, data });
    } catch {
      return undefined;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.album.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
