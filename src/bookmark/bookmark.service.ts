import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    try {
      const newBookmark = await this.prisma.bookmark.create({
        data: { ...dto, userId },
      });
      return newBookmark;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException('Wrong user ID');
        }
      }
    }
  }

  async getBookmark() {
    try {
      const newBookmark = await this.prisma.bookmark.findMany();
      return newBookmark;
    } catch (error) {
      console.log(error);
    }
  }

  async getBookmarkByUserId(userId: number) {
    try {
      const bookmarks = await this.prisma.bookmark.findMany({
        where: { userId },
      });
      return bookmarks;
    } catch (error) {
      console.log(error);
    }
  }

  async getBookmarkByBookmarkId(bookmarkId: number) {
    try {
      const bookmarks = await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
      return bookmarks;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBookmark(bookmarkId: number, dto: CreateBookmarkDto) {
    try {
      const bookmarks = await this.prisma.bookmark.update({
        where: { id: bookmarkId },
        data: { ...dto },
      });
      return bookmarks;
    } catch (error) {
      console.log(error);
    }
  }
}
