import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';

@UseGuards(JwtGuard) // guarded by 'jwt-access' strategy
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  // POST /bookmark/create
  @Post('create')
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  // GET /bookmark/all
  @Get('/all')
  getBookmark() {
    return this.bookmarkService.getBookmark();
  }

  // GET /bookmark
  @Get()
  getBookmarkByUserId(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarkByUserId(userId);
  }

  // GET /bookmark/:id
  @Get(':id')
  getBookmarkByBookmarkId(@Param('id', ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.getBookmarkByBookmarkId(bookmarkId);
  }

  // PATCH /bookmark/:id
  @Patch(':id')
  updateBookmark(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(bookmarkId, dto);
  }

  // describe('Delete bookmark', () => {});
}
