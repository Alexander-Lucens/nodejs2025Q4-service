import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAllFavorites() {
    return this.favsService.getAll();
  }

  @Post('/track/:id')
  createFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post('/album/:id')
  createFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  createFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteArtist(id);
  }
}
