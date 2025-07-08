import { OCRResult } from '../../domain/enum/OcrResult.types';
import { OcrStatus } from '../../domain/enum/OcrStatus.enum';

export class CreateOcrProcessResponseDto {
  id: string;
  filePath: string | null;
  status: OcrStatus;
  createdAt: Date;
  updatedAt: Date | null;
  extractedText: OCRResult | null;
}
