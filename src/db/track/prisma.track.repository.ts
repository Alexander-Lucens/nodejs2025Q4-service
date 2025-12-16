import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ITrackRepository } from './track.repository.interface';
import { CreateTrackDto, UpdateTrackDto } from 'src/interfaces/track.interface';
import { Track } from '@prisma/client';

@Injectable()
export class PrismaTrackRepository implements ITrackRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async getById(id: string): Promise<Track | undefined> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) return undefined;
    return track;
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({ data: dto });
  }

  async update(id: string, data: UpdateTrackDto): Promise<Track | undefined> {
    try {
      return await this.prisma.track.update({ where: { id }, data });
    } catch (e) {
      return undefined;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.track.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
