import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OcrProcessingEvent } from '../events/OcrProcessing.event';
import { OcrRepository } from '../../infrastructure/persistence/repositories/Ocr.repository';
import {
  mapOcrAggregateToOcrEntity,
  mapOcrEntityToOcrAggregate,
} from '../mappers/Ocr.mapper';
import { OcrFileService } from './OcrFile.service';
import { OCRResult } from '../../domain/enum/OcrResult.types';
import { isValidOcrResult } from '../validators/OcrResult.validator';
import { OcrStatus } from '../../domain/enum/OcrStatus.enum';
import { OcrAggregate } from '../../domain/aggregates/Ocr.aggregate';
import { OcrEntity } from '../../infrastructure/persistence/entities/Ocr.entity';

@EventsHandler(OcrProcessingEvent)
export class OcrReaderService implements IEventHandler<OcrProcessingEvent> {
  constructor(
    private readonly ocrRepository: OcrRepository,
    private readonly ocrFileService: OcrFileService,
  ) {}

  async handle(event: OcrProcessingEvent): Promise<void> {
    try {
      const aggregate = await this.getOcrAggregate(event.recordId);

      aggregate.setStatus(OcrStatus.PROCESSING);

      await this.updateOcrRecord(aggregate);

      const filePath = aggregate.getFilePath();
      const file = await this.ocrFileService.readFile(filePath);
      const ocrResult = await this.performOcrProcessing(file);

      if (!isValidOcrResult(ocrResult)) {
        throw new Error('Ocr result is not valid');
      }

      aggregate.setExtractedText(ocrResult);
      aggregate.setStatus(OcrStatus.COMPLETED);

      await this.updateOcrRecord(aggregate);
    } catch (error) {
      const aggregate = await this.getOcrAggregate(event.recordId);

      aggregate.setStatus(OcrStatus.FAILED);

      const persistence = mapOcrAggregateToOcrEntity(
        aggregate,
        new OcrEntity(),
      );

      await this.ocrRepository.update(persistence);
    }
  }

  private async updateOcrRecord(aggregate: OcrAggregate): Promise<OcrEntity> {
    const persistence = mapOcrAggregateToOcrEntity(aggregate, new OcrEntity());
    return this.ocrRepository.update(persistence);
  }

  private async getOcrAggregate(recordId: string): Promise<OcrAggregate> {
    const ocrEntity = await this.ocrRepository.findById(recordId);

    if (!ocrEntity) {
      throw new Error('Ocr record not found');
    }

    const aggregate = mapOcrEntityToOcrAggregate(ocrEntity);

    return aggregate;
  }

  private async performOcrProcessing(file: Buffer): Promise<OCRResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: 'This is a simulated OCR result.',
          confidence: 0.98,
          language: 'en',
        });
      }, 20000);
    });
  }
}
