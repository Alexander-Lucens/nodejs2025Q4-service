import {
  CreateAlbumDto,
  Album,
  UpdateAlbumDto,
} from 'src/interfaces/album.interface';

export interface IAlbumRepository {
  getAll(): Promise<Album[]>;
  getById(id: string): Promise<Album | undefined>;
  create(data: CreateAlbumDto): Promise<Album>;
  update(id: string, data: UpdateAlbumDto): Promise<Album | undefined>;
  delete(id: string): Promise<boolean>;
}
