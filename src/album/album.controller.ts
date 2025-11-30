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
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/interfaces/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAll();
  }

  @Get(':id')
  getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getById(id);
  }

  @Post()
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumService.create(body);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.delete(id);
  }
}
