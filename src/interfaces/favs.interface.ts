import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { Artist } from './artist.interface';
import { Album } from './album.interface';
import { Track } from './track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoritesDto implements Favorites {
  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  artists: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  albums: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
