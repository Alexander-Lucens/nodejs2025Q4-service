import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IArtistRepository } from './artist.repository.interface';
import { Artist } from '@prisma/client';
import {
  CreateArtistDto,
  UpdateArtistDto,
} from 'src/interfaces/artist.interface';

@Injectable()
export class PrismaArtistRepository implements IArtistRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async getById(id: string): Promise<Artist | undefined> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) return undefined;
    return artist;
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
    return {
      ...artist,
    };
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist | undefined> {
    try {
      const updatedartist = await this.prisma.artist.update({
        where: { id },
        data: {
          name: dto.name,
          grammy: dto.grammy,
        },
      });
      return {
        ...updatedartist,
      };
    } catch (e) {
      return undefined;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.artist.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
