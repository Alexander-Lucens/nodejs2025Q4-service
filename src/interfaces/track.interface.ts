import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  duration: number;

  @IsOptional()
  @IsUUID(4, { message: 'artistId must be a valid UUID' })
  artistId: string | null;

  @IsOptional()
  @IsUUID(4, { message: 'albumId must be a valid UUID' })
  albumId: string | null;
}

export class UpdateTrackDto extends CreateTrackDto {}
