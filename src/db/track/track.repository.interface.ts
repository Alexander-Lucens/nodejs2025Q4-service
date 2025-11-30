import {
  CreateTrackDto,
  Track,
  UpdateTrackDto,
} from 'src/interfaces/track.interface';

export interface ITrackRepository {
  getAll(): Promise<Track[]>;
  getById(id: string): Promise<Track | undefined>;
  create(data: CreateTrackDto): Promise<Track>;
  update(id: string, data: UpdateTrackDto): Promise<Track | undefined>;
  delete(id: string): Promise<boolean>;
}
