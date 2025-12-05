import {
  CreateArtistDto,
  Artist,
  UpdateArtistDto,
} from 'src/interfaces/artist.interface';

export interface IArtistRepository {
  getAll(): Promise<Artist[]>;
  getById(id: string): Promise<Artist | undefined>;
  create(data: CreateArtistDto): Promise<Artist>;
  update(id: string, data: UpdateArtistDto): Promise<Artist | undefined>;
  delete(id: string): Promise<boolean>;
}
