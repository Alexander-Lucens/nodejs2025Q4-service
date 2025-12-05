import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto extends CreateArtistDto {}

export class ArtistResponse implements Artist {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
