import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto';

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async createRecord(userId: number, dto: CreateRecordDto) {
    try {
      const newRecord = await this.prisma.record.create({
        data: { ...dto, userId },
      });
      return newRecord;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException('Wrong user ID');
        }
      }
    }
  }

  async getRecord() {
    try {
      const newRecord = await this.prisma.record.findMany();
      return newRecord;
    } catch (error) {
      console.log(error);
    }
  }

  async getRecordByUserId(userId: number) {
    try {
      const records = await this.prisma.record.findMany({
        where: { userId },
      });
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async getRecordByRecordId(recordId: number) {
    try {
      const records = await this.prisma.record.findUnique({
        where: { id: recordId },
      });
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async updateRecord(recordId: number, dto: CreateRecordDto) {
    try {
      const records = await this.prisma.record.update({
        where: { id: recordId },
        data: { ...dto },
      });
      return records;
    } catch (error) {
      console.log(error);
    }
  }
}
