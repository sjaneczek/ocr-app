import { Module } from '@nestjs/common';
import { OcrController } from './infrastructure/http/Ocr.controller';
import { OcrService } from './application/services/Ocr.service';
import { OcrRepository } from './infrastructure/persistence/repositories/Ocr.repository';
import { OcrEntity } from './infrastructure/persistence/entities/Ocr.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcrFileService } from './application/services/OcrFile.service';
import { OcrReaderService } from './application/services/OcrReader.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([OcrEntity]), CqrsModule],
  controllers: [OcrController],
  providers: [OcrService, OcrRepository, OcrFileService, OcrReaderService],
})
export class OcrModule {}
