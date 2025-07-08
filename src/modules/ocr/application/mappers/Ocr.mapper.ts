import { OcrAggregate } from '../../domain/aggregates/Ocr.aggregate';
import { OcrEntity } from '../../infrastructure/persistence/entities/Ocr.entity';
import { CreateOcrProcessResponseDto } from '../dto/CreateOcrProcessResponse.dto';

export const mapOcrAggregateToOcrEntity = (
  aggregate: OcrAggregate,
  entity: OcrEntity,
): OcrEntity => {
  entity.id = aggregate.id;
  entity.filePath = aggregate.filePath;
  entity.status = aggregate.status;
  entity.createdAt = aggregate.createdAt;
  entity.updatedAt = aggregate.updatedAt;
  entity.extractedText = aggregate.extractedText;

  return entity;
};

export const mapOcrEntityToOcrAggregate = (entity: OcrEntity): OcrAggregate => {
  return new OcrAggregate({
    id: entity.id,
    filePath: entity.filePath,
    status: entity.status,
    extractedText: entity.extractedText,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  });
};

export const mapOcrEntityToCreateOcrProcessResponseDto = (
  entity: OcrEntity,
): CreateOcrProcessResponseDto => {
  return {
    id: entity.id,
    filePath: entity.filePath,
    status: entity.status,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    extractedText: entity.extractedText,
  };
};

export const mapOcrEntityToReadOcrProcessResponseDto = (
  entity: OcrEntity[],
): CreateOcrProcessResponseDto[] => {
  return entity.map((entity) => ({
    id: entity.id,
    filePath: entity.filePath,
    status: entity.status,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    extractedText: entity.extractedText,
  }));
};
