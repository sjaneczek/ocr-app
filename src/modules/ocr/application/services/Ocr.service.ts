import { Injectable } from '@nestjs/common';
import { CreateOcrProcessDto } from '../dto/CreateOcrProcess.dto';
import { OcrFileService } from './OcrFile.service';
import { OcrAggregate } from '../../domain/aggregates/Ocr.aggregate';
import { OcrStatus } from '../../domain/enum/OcrStatus.enum';
import { OcrEntity } from '../../infrastructure/persistence/entities/Ocr.entity';
import {
  mapOcrAggregateToOcrEntity,
  mapOcrEntityToCreateOcrProcessResponseDto,
  mapOcrEntityToReadOcrProcessResponseDto,
} from '../mappers/Ocr.mapper';
import { CreateOcrProcessResponseDto } from '../dto/CreateOcrProcessResponse.dto';
import { OcrRepository } from '../../infrastructure/persistence/repositories/Ocr.repository';
import { EventBus } from '@nestjs/cqrs';
import { OcrProcessingEvent } from '../events/OcrProcessing.event';

@Injectable()
export class OcrService {
  constructor(
    private readonly ocrFileService: OcrFileService,
    private readonly ocrRepository: OcrRepository,
    private readonly eventBus: EventBus,
  ) {}

  async createOcrProcess(
    data: CreateOcrProcessDto,
  ): Promise<CreateOcrProcessResponseDto> {
    try {
      // 1. Save the file to the file system
      const filePath = await this.ocrFileService.saveFile(data.file);

      // 2. Create the OcrAggregate
      const aggregate = new OcrAggregate({
        id: crypto.randomUUID(),
        filePath,
        status: OcrStatus.UPLOADED,
        createdAt: new Date(),
        updatedAt: null,
        extractedText: null,
      });

      // 3. Save ocrRecord
      const ocrRecord = await this.saveOcrRecord(aggregate);

      // 4. Publish the OcrProcessingEvent
      this.eventBus.publish(new OcrProcessingEvent(ocrRecord.id));

      // 5. Map the OcrEntity to the CreateOcrProcessResponseDto
      return mapOcrEntityToCreateOcrProcessResponseDto(ocrRecord);
    } catch (error) {
      // 1. Create the OcrAggregate
      const aggregate = new OcrAggregate({
        id: crypto.randomUUID(),
        filePath: null,
        status: OcrStatus.FAILED,
        createdAt: new Date(),
        updatedAt: null,
        extractedText: null,
      });

      // 2. Save ocrRecord
      const ocrRecord = await this.saveOcrRecord(aggregate);

      // 3. Map the OcrEntity to the CreateOcrProcessResponseDto
      return mapOcrEntityToCreateOcrProcessResponseDto(ocrRecord);
    }
  }

  async readOrcProcessRecords(): Promise<OcrEntity[]> {
    const ocrRecords = await this.ocrRepository.findAll();

    return mapOcrEntityToReadOcrProcessResponseDto(ocrRecords);
  }

  private async saveOcrRecord(aggregate: OcrAggregate): Promise<OcrEntity> {
    const persistence = mapOcrAggregateToOcrEntity(aggregate, new OcrEntity());

    const ocrRecord = await this.ocrRepository.create(persistence);

    return ocrRecord;
  }
}
