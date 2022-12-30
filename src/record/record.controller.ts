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
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto';

@UseGuards(JwtGuard) // guarded by 'jwt-access' strategy
@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  // POST /record/create
  @Post('create')
  createRecord(@GetUser('id') userId: number, @Body() dto: CreateRecordDto) {
    return this.recordService.createRecord(userId, dto);
  }

  // GET /record/all
  @Get('/all')
  getRecord() {
    return this.recordService.getRecord();
  }

  // GET /record
  @Get()
  getRecordByUserId(@GetUser('id') userId: number) {
    return this.recordService.getRecordByUserId(userId);
  }

  // GET /record/:id
  @Get(':id')
  getRecordByRecordId(@Param('id', ParseIntPipe) recordId: number) {
    return this.recordService.getRecordByRecordId(recordId);
  }

  // PATCH /record/:id
  @Patch(':id')
  updateRecord(
    @Param('id', ParseIntPipe) recordId: number,
    @Body() dto: CreateRecordDto,
  ) {
    return this.recordService.updateRecord(recordId, dto);
  }

  // describe('Delete record', () => {});
}
