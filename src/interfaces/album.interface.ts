import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID(4)
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}

export class AlbumResponse implements Album {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID(4)
  artistId: string | null;
}
