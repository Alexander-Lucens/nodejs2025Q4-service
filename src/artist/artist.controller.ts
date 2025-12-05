import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import {
  CreateArtistDto,
  UpdateArtistDto,
} from 'src/interfaces/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAll();
  }

  @Get(':id')
  getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getById(id);
  }

  @Post()
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistService.create(body);
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateArtistDto,
  ) {
    return this.artistService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.delete(id);
  }
}
