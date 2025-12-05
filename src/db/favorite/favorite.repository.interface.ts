import { Favorites } from 'src/interfaces/favs.interface';

export interface IFavoriteRepository {
  getAll(): Promise<Favorites>;

  addTrack(id: string): Promise<boolean>;
  deleteTrack(id: string): Promise<boolean>;

  addAlbum(id: string): Promise<boolean>;
  deleteAlbum(id: string): Promise<boolean>;

  addArtist(id: string): Promise<boolean>;
  deleteArtist(id: string): Promise<boolean>;
}
